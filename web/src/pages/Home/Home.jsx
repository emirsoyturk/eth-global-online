import Post from "./Post.jsx";
import {shortenAddress} from "../../utils/index.js";
import {useState} from "react";
import {
    indexesToSentence,
    sentenceToIndexes,
    mimcHash,
    prove,
    getTimelineContract,
    getSigner
} from "../../api/index.js";

export default function Home(props) {
    const {posts} = props
    return (
        <div className={"col-span-3 grid grid-cols-1 border-collapse w-full"}>
            <NewPost address={"0x00x00"}/>
            {
                posts.map((post, i) => (
                        <Post key={i}
                              sender={"AAAAA"}
                              pic={""}
                              address={post.author}
                              text={post.content}
                              likes={post.likes}
                              comments={post.commentsCount}
                              date={"24s"}
                              positive={true}
                              id={post.id}
                        />
                    )
                )
            }
        </div>
    )
}

function NewPost(props) {
    const {address} = props
    const [text, setText] = useState('')
    const [ghost, setGhost] = useState('')
    const [nsfw, setNsfw] = useState(false)
    const [proof, setProof] = useState(null)
    const handleProof = async () => {
        const indexes = await sentenceToIndexes(text)
        const hash = await mimcHash(indexes)

        const proof = await prove(indexes, hash, !nsfw)
        setProof(proof)
    }

    const handleSubmit = async () => {
        const contract = await getTimelineContract()
        const signer = await getSigner()

        const inputs = proof.slice(0, 1856)
        const slicedProof = proof.slice(1856)

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
        setText(e.target.value)
        const indexes = await sentenceToIndexes(e.target.value.trim())
        const sentence = await indexesToSentence(indexes)
        setGhost(sentence.join(' '))
    }
    return (
        <div className={"relative flex flex-col px-4 py-2 border-[1px] border-opacity-30 border-dark_666"}>
            <div className={"flex flex-row"}>

                <div className={"pr-3"}>
                    <div className={"bg-dark_666 h-10 w-10 rounded-full aspect-square"}/>
                </div>
                <div className={"w-full"}>
                <span className={"text-white font-bold"}>
                    {"You"}
                    {' '}
                </span>
                    <span className={"text-dark_666"}>
                    {shortenAddress({address})}
                        {' • '}
                </span>
                    <input type={"text"}
                           className={"block text-white font-semibold bg-dark_111 w-full focus:outline-0"}
                           placeholder={"Post something"}
                           value={text}
                           onChange={handleChange}
                    />
                    <input type={"text"}
                           className={"block text-dark_444 font-semibold bg-dark_111 w-full focus:outline-0"}
                           placeholder={"Post something"}
                           contentEditable={false}
                           value={ghost}
                    />
                </div>
            </div>
            <div className={"flex  mb-0 mt-auto space-x-4"}>
                <section className={"flex items-center"}>
                    <label className={"text-dark_777"}>
                        NSFW:
                    </label>
                    <input type={"checkbox"}
                           className={"ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded accent-dark_666"}
                           onClick={(e) => setNsfw(e.target.checked)}
                    />
                </section>
                <button className={"border border-dark_444 px-2 py-1 bg-dark_111 rounded-md text-dark_777"}
                        onClick={handleProof}
                >
                    Prove
                </button>
                <button className={"border border-dark_444 px-2 py-1 bg-dark_111 rounded-md text-dark_777"}
                        onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}