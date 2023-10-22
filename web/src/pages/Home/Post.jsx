import {shortenAddress} from "../../utils/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";
import {getSigner, getTimelineContract, likePost, verify} from "../../api/index.js";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export default function Post(props) {
    const {address, text, date, likes, comments, id} = props
    const [username, setUsername] = useState('')
    const [showComments, setShowComments] = useState(false);

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
                    <PostIcon icon={faComment} count={comments} onClick={showThread}/>
                    <PostIcon icon={faHeart} count={likes} onClick={handleLike}/>
                </div>
                {showComments && (
                    <div className="mt-4">
                        <div className="space-y-2">
                            <Comment username={"Volthai7us"}
                                     text={"Nice text broNice text broNice text bro"}
                            />
                            <Comment username={"Volthai7us"}
                                     text={"Nice text bro"}
                            />
                            <Comment username={"Volthai7us"}
                                     text={"Nice text bro"}
                            />
                        </div>
                        <NewComment />
                    </div>
                )}
            </div>

        </div>
    )
}

function Comment(props) {
    const {username, text} = props
    return (
        <div className="flex items-start space-x-2 w-56">
            <div className="flex flex-col text-dark_777 w-full">
                <span className="font-semibold text-dark_777 text-sm">{username}</span>
                <p className={"text-dark_666 text-sm"}>{text}</p>
                <span className={"text-center"}>
                    {' • '}
                </span>
            </div>
        </div>
    )
}

function NewComment(props) {
    const [proof, setProof] = useState(null)
    const [loading, setLoading] = useState(false)
    const [nsfw, setNsfw] = useState(false)

    const handleProof = async () => {
    }

    const handleComment = async () => {
    }

    return (
        <div className="flex items-center space-x-2 mt-4">
            <input type="text"
                   placeholder="Write a comment"
                   className="text-white font-semibold bg-dark_111 w-full rounded px-2 py-1 focus:ring-2 focus:outline-none"
            />
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
                    className={`${loading ? 'cursor-not-allowed': 'hover:bg-dark_222'} border border-dark_444 px-3 py-1 bg-dark_111 rounded-md shadow-sm text-dark_777 `}
                    onClick={handleProof}
                    disabled={loading}
                >
                    Prove
                </button>
                <button
                    className={`${loading || !proof ? 'cursor-not-allowed': 'hover:bg-dark_222'} border border-dark_444 px-3 py-1 bg-dark_111 rounded-md shadow-sm text-dark_777 `}
                    onClick={handleComment}
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