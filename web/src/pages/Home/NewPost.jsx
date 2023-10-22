import {useEffect, useState} from "react";
import {
    getSigner,
    getTimelineContract,
    indexesToSentence,
    mimcHash,
    feProve,
    sentenceToIndexes
} from "../../api/index.js";
import {toast} from "react-hot-toast";
import {shortenAddress} from "../../utils/index.js";
import ReactLoading from 'react-loading';

export default function NewPost() {
    const [text, setText] = useState('')
    const [ghost, setGhost] = useState('')
    const [nsfw, setNsfw] = useState(false)
    const [address, setAddress] = useState('')
    const [proof, setProof] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleProof = async () => {
        const indexes = await sentenceToIndexes(ghost)
        const hash = await mimcHash(indexes)

        setLoading(true)
        const proof = await feProve(
            {
                input: indexes,
                hash: hash,
                positive: !nsfw
            }
        )
        setLoading(false)
        if (proof.error) {
            toast.error("Proof couldn't generated. Try to change Sensitive tag.")
        } else if (proof.proof) {
            toast.success("Proof is generated. You can submit your post.")
            setProof(proof.proof)
        }
    }

    const handleSubmit = async () => {
        const contract = await getTimelineContract()
        const signer = await getSigner()

        const inputs = proof.slice(0, 2176)
        const slicedProof = proof.slice(2176)

        const chunkSize = 64;
        const array = [];

        for (let i = 0; i < inputs.length; i += chunkSize) {
            array.push("0x" + inputs.slice(i, i + chunkSize));
        }

        contract
            .connect(signer)
            .createPost("0x" + slicedProof, array)
    }

    const handleChange = async (e) => {
        setText(e.target.value.toLowerCase())
        const indexes = await sentenceToIndexes(e.target.value.trim())
        const sentence = await indexesToSentence(indexes)
        if (e.target.value === "") {
            setGhost("")
        } else {
            setGhost(sentence.join(' '))
        }
    }

    useEffect(() => {
        const fetchAddress = async () => {
            const signer = await getSigner()
            const accounts = await signer.provider.listAccounts()
            setAddress(accounts[0])
        }

        fetchAddress()
    }, []);
    const types = ["blank", "balls", "bars", "bubbles", "cubes", "cylon", "spin", "spinningBubbles", "spokes"]
    return (
        <div className="flex flex-col px-4 py-2 border border-opacity-30 border-dark_666 rounded shadow-md">
            {loading &&
                <div className={"fixed top-0 left-1/2 -translate-x-1/2"}>
                    <ReactLoading/>
                </div>
            }
            <div className="flex flex-row items-start mb-4">
                <div className="pr-4 mt-2">
                    <div className="bg-dark_666 h-10 w-10 mb-auto rounded-full shadow"/>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center px-2 py-1">
                        <span className="text-white font-bold text-lg">
                        You
                        </span>
                        <span className="text-dark_666 text-sm">
                            {shortenAddress({address})}
                        </span>
                    </div>
                    <input
                        type="text"
                        className="mt-2 text-white font-semibold bg-dark_111 w-full rounded px-2 py-1 focus:ring-2 focus:outline-none"
                        placeholder="Post something"
                        value={text}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="mt-2 text-dark_444 placeholder:text-dark_444 font-semibold bg-dark_111 w-full rounded px-2 py-1 focus:outline-none"
                        placeholder="Post something"
                        contentEditable={false}
                        readOnly={true}
                        value={ghost}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto space-x-4">
                <section className="flex items-center text-dark_777">
                    <label>
                        Sensitive:
                    </label>
                    <input
                        type="checkbox"
                        className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded cursor-pointer"
                        onClick={(e) => setNsfw(e.target.checked)}
                    />
                </section>
                <div className="space-x-2">
                    <button
                        className={`${loading ? 'cursor-not-allowed' : 'hover:bg-dark_222'} border border-dark_444 px-3 py-1 bg-dark_111 rounded-md shadow-sm text-dark_777 `}
                        onClick={handleProof}
                        disabled={loading}
                    >
                        Prove
                    </button>
                    <button
                        className={`${loading || !proof ? 'cursor-not-allowed' : 'hover:bg-dark_222'} border border-dark_444 px-3 py-1 bg-dark_111 rounded-md shadow-sm text-dark_777 `}
                        onClick={handleSubmit}
                        disabled={loading || !proof}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}