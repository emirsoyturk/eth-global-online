import {shortenAddress} from "../../utils/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";
import {
    feProve,
    getAndParseComment,
    getAndParsePost,
    getSigner,
    getTimelineContract, indexesToSentence,
    likePost, mimcHash, prove, sentenceToIndexes,
    verify
} from "../../api/index.js";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import ReactLoading from "react-loading";

export default function Post(props) {
    const {address, text, date, likes, commentsCount, id, censor} = props
    const [username, setUsername] = useState('')
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchProfile = async () => {
            const contract = await getTimelineContract()
            const signer = await getSigner()
            if (contract) {
                const profile = await contract
                    .connect(signer)
                    .getUserProfile(address)

                setUsername(profile[0])
            }
        };

        fetchProfile()
    }, [address]);

    const handleLike = async () => {
        const res = await likePost(id)
        if (res.status) {
            toast.success("Liked!")
        } else {
            toast.error(res.err)
        }
    }

    const handleVerify = async () => {
        const verified = await verify(id)
        if (verified) {
            toast.success("Verified!")
        } else {
            toast.error("Not verified!")
        }
    }

    const showThread = () => {
        setShowComments(!showComments);
    }

    useEffect(() => {
        const fetchComments = async () => {
            const comments = []
            const contract = await getTimelineContract()
            if (contract) {
                for (let i = comments.length; i < commentsCount; i++) {
                    const comment = await getAndParseComment(contract, id, i)
                    comment.id = i
                    if (!comment.error && (!censor || comment.positive)) {
                        comments.push(comment)
                    }
                }
            }
            setComments(comments)
        };

        fetchComments();
    }, [commentsCount, censor]);

    return (
        <div className="relative flex flex-row items-start px-4 py-2 border border-opacity-30 border-dark_666">
            <button
                className="absolute right-4 top-4 transform bg-dark_111 border border-dark_444 text-white px-2 py-1 rounded shadow-lg"
                onClick={handleVerify}
            >
                Verify
            </button>
            <div className="pr-4 pt-1">
                <div className="bg-dark_666 h-10 w-10 rounded-full aspect-square shadow-lg"/>
            </div>
            <div>
                <span className="text-white font-bold text-lg leading-tight">
                    {username}
                </span>
                <span className="text-dark_666 text-sm ml-2">
                    {shortenAddress({address})}
                </span>
                <span className="text-dark_666 text-sm ml-2">
                    {' • '}
                </span>
                <div className="mt-2 text-white font-semibold text-base leading-snug">
                    {text}
                </div>
                <div className="flex flex-row justify-between w-32 text-dark_555 mt-4">
                    <PostIcon icon={faComment} count={commentsCount} onClick={showThread}/>
                    <PostIcon icon={faHeart} count={likes} onClick={handleLike}/>
                </div>
                {showComments && (
                    <div className="mt-4">
                        <div className="space-y-2">
                            {
                                comments.map((comment, index) => (
                                    <Comment key={index}
                                             username={""}
                                             author={comment.author}
                                             text={comment.content}
                                    />
                                ))
                            }
                        </div>
                        <NewComment postId={id}/>
                    </div>
                )}
            </div>

        </div>
    )
}

function Comment(props) {
    const {username, text, author} = props
    return (
        <div className="flex items-start space-x-2 w-56">
            <div className="flex flex-col text-dark_777 w-full">
                <span className="font-semibold text-dark_777 text-sm">{shortenAddress({address: author})}</span>
                <p className={"text-dark_666 text-sm"}>{text}</p>
                <span className={"text-center"}>
                    {' • '}
                </span>
            </div>
        </div>
    )
}

function NewComment(props) {
    const {postId} = props
    const [proof, setProof] = useState(null)
    const [loading, setLoading] = useState(false)
    const [nsfw, setNsfw] = useState(false)
    const [text, setText] = useState('')
    const [ghost, setGhost] = useState('')

    function uint8ArrayToHex(uint8Array) {
        return Array.from(uint8Array).map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    const handleProof = async () => {
        const indexes = await sentenceToIndexes(ghost)
        const hash = await mimcHash(indexes)

        setLoading(true)
        const proof = await feProve({
            input: indexes,
            hash: hash,
            positive: !nsfw
        })

        setLoading(false)
        if (proof.error) {
            toast.error("Proof couldn't generated. Try to change Sensitive tag.")
        } else if (proof.proof) {
            toast.success("Proof is generated. You can submit your post.")
            setProof(proof.proof)
        }
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

    const handleSubmit = async () => {
        const contract = await getTimelineContract()
        const signer = await getSigner()

        const inputs = proof.publicInputs
        const slicedProof = uint8ArrayToHex(proof.proof)

        const array = [];

        for (let i = 0; i < inputs.length; i++) {
            array.push("0x" + uint8ArrayToHex(inputs[i]));
        }

        await contract
            .connect(signer)
            .commentOnPost(postId, "0x" + slicedProof, array)

        setProof(null)
    }

    return (
        <div className="flex items-start space-x-2 mt-4">
            {loading &&
                <div className={"fixed top-0 left-1/2 -translate-x-1/2"}>
                    <ReactLoading/>
                </div>
            }
            <div className={"flex flex-col"}>
                <input
                    type="text"
                    className="mt-2 text-white font-semibold bg-dark_111 w-full rounded px-2 py-1 focus:ring-2 focus:outline-none"
                    placeholder="Write a comment"
                    value={text}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="mt-2 text-dark_444 placeholder:text-dark_444 font-semibold bg-dark_111 w-full rounded px-2 py-1 focus:outline-none"
                    placeholder="Write a comment"
                    contentEditable={false}
                    readOnly={true}
                    value={ghost}
                />
            </div>
            <div className="flex space-x-2">
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
                <button
                    className={`${loading ? 'cursor-not-allowed' : 'hover:bg-dark_222'} border border-dark_444 px-3 py-1 bg-dark_111 rounded-md shadow-sm text-dark_777 `}
                    onClick={handleProof}
                    disabled={loading}
                >
                    Prove
                </button>
                <button
                    className={`${loading || !proof ? 'cursor-not-allowed' : 'hover:bg-dark_222'} ${proof ? 'animate-pulse' : 'bg-dark_111'} border border-dark_444 px-3 py-1 rounded-md shadow-sm text-dark_777 `}
                    onClick={handleSubmit}
                    disabled={loading || !proof}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

function PostIcon(props) {
    const {icon, count, onClick} = props

    return (
        <div className={""}>
            <FontAwesomeIcon icon={icon}
                             onClick={onClick}
                             className={"cursor-pointer"}
            />
            <span className={"ml-4"}>
                {count}
            </span>
        </div>
    )
}