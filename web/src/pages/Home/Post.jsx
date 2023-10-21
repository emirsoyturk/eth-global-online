import {shortenAddress} from "../../utils/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";
import {getSigner, getTimelineContract} from "../../api/index.js";
import {useEffect, useState} from "react";

export default function Post(props) {
    const {address, text, date, likes, comments, id} = props
    const [username, setUsername] = useState('')

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
        const contract = await getTimelineContract()
        const signer = await getSigner()

        contract
            .connect(signer)
            .likePost(id)
    }

    return (
        <div className="relative flex flex-row items-center px-4 py-2 border border-opacity-30 border-dark_666">
            <button
                className="absolute right-4 top-4 transform bg-dark_111 border border-dark_444 text-white px-2 py-1 rounded shadow-lg">
                Verify
            </button>
            <div className="pr-4">
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
                <div className="flex flex-row justify-between w-1/2 text-dark_555 mt-4">
                    <PostIcon icon={faComment} count={comments}/>
                    <PostIcon icon={faHeart} count={likes} onClick={handleLike}/>
                </div>
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