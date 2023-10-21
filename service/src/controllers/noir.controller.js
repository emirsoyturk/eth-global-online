const {ethers} = require("ethers");

const {handleAsync} = require('../services/error.service')
const {generalLogger} = require('../services/logger.service')
const circuit = require('../../../noir/sentiment/target/sentiment.json')
const {decompressSync} = require('fflate')
const {compressWitness, executeCircuit} = require("@noir-lang/acvm_js")

let Crs, newBarretenbergApiAsync, RawBuffer
import('@aztec/bb.js/dest/node/index.js').then(mod => {
        Crs = mod.Crs
        newBarretenbergApiAsync = mod.newBarretenbergApiAsync
        RawBuffer = mod.RawBuffer
    }
);

function decompression() {
    const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
    const acirBufferUncompressed = decompressSync(acirBuffer);

    return {
        acirBufferUncompressed,
        acirBuffer
    }
}

async function initializeBB(acirBufferUncompressed) {
    const api = await newBarretenbergApiAsync(4);

    const [exact, circuitSize, subgroup] = await api.acirGetCircuitSizes(acirBufferUncompressed);
    const subgroupSize = Math.pow(2, Math.ceil(Math.log2(circuitSize)));
    const crs = await Crs.new(subgroupSize + 1);
    await api.commonInitSlabAllocator(subgroupSize);
    await api.srsInitSrs(new RawBuffer(crs.getG1Data()), crs.numPoints, new RawBuffer(crs.getG2Data()));

    const acirComposer = await api.acirNewAcirComposer(subgroupSize);

    return {
        acirComposer,
        api
    }
}

async function generateWitness(input, hash, positive, acirBuffer) {
    const initialWitness = new Map();

    const public_inputs = [
        ...input.map(x => ethers.utils.hexZeroPad(ethers.utils.hexlify(x), 32)),
        ethers.utils.hexZeroPad(ethers.utils.hexlify(positive), 32),
        hash,
    ]

    for (let i = 0; i < public_inputs.length; i++) {
        initialWitness.set(i + 1, public_inputs[i]);
    }

    const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
        throw Error('unexpected oracle');
    });

    return compressWitness(witnessMap);
}

async function generateProof({witness, api, acirComposer, acirBufferUncompressed}) {
    const proof = await api.acirCreateProof(
        acirComposer,
        acirBufferUncompressed,
        decompressSync(witness),
        false,
    );
    return proof;
}

async function prove(req, res) {
    const {input, hash, positive} = req.body
    const acirBuffers = decompression()
    const bb = await initializeBB(acirBuffers.acirBufferUncompressed)

    const witness = await generateWitness(input, hash, positive, acirBuffers.acirBuffer)
    const proof = await generateProof({
        witness: witness,
        api: bb.api,
        acirComposer: bb.acirComposer,
        acirBufferUncompressed: acirBuffers.acirBufferUncompressed
    })

    let hex = Buffer.from(proof).toString('hex');
    res.json(hex)
}

const fromHexString = (hexString) =>
    Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

async function verify(req, res) {
    const {proof} = req.body

    const acirBuffers = decompression()
    const bb = await initializeBB(acirBuffers.acirBufferUncompressed)
    await bb.api.acirInitProvingKey(bb.acirComposer, acirBuffers.acirBufferUncompressed);
    const verified = await bb.api.acirVerifyProof(bb.acirComposer, fromHexString(proof), false);

    console.log(verified)
    res.json(verified)
}

module.exports = {
    prove: handleAsync(prove),
    verify: handleAsync(verify)
}
