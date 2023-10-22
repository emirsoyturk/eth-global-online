import {ethers} from "ethers";
import circuit from './sentiment.json'
import {BarretenbergBackend} from '@noir-lang/backend_barretenberg';
import {Noir} from '@noir-lang/noir_js';

export async function feProve({
                                  input,
                                  hash,
                                  positive
                              }) {
    try {
        const backend = new BarretenbergBackend(circuit);
        const noir = new Noir(circuit, backend);
        await noir.init();
        const publicInputs = {
            input: input.map(x => ethers.utils.hexZeroPad(ethers.utils.hexlify(x), 32)),
            hash: hash,
            intent: ethers.utils.hexZeroPad(ethers.utils.hexlify(positive ? 1 : 0), 32)
        }

        console.log(publicInputs)
        console.log(positive)
        const proof = await noir.generateFinalProof(publicInputs);

        return {
            proof: proof
        }
    } catch (e) {
        console.log(e)
        return {
            error: "could not satisfy all constraints"
        }
    }

}
