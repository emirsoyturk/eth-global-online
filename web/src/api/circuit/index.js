import {decompressSync} from "fflate";
import {ethers} from "ethers";
import __wbg_init, {executeCircuit, compressWitness} from "@noir-lang/acvm_js";
import {newBarretenbergApiAsync, RawBuffer, Crs, newBarretenbergApiSync} from "@aztec/bb.js/dest/browser/index.js";
import circuit from './sentiment.json'

function decompression() {
    const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
    const acirBufferUncompressed = decompressSync(acirBuffer);

    return {
        acirBufferUncompressed,
        acirBuffer
    }
}

async function initializeBB(acirBufferUncompressed) {
    const api = await newBarretenbergApiSync();

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

export async function feProve({
                                  input,
                                  hash,
                                  positive
                              }) {
    try {
        const o = await __wbg_init()
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

        await bb.api.destroy()

        return {
            proof: hex
        }
    } catch (e) {
        console.log(e)
        return {
            error: "could not satisfy all constraints"
        }
    }

}
