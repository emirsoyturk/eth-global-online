import {shortenAddress} from "../../utils/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";

export default function Post(props) {
    const {sender, address, text, date} = props

    return (
        <div className={"relative flex flex-row px-4 py-2 border-[1px] border-opacity-30 border-dark_666"}>
            <button className={"absolute bg-dark_111 -right-2 -top-2 border border-dark_444 text-white px-2 py-1"}>
                Verify
            </button>
            <div className={"pr-3"}>
                <div className={"bg-dark_666 h-10 w-10 rounded-full aspect-square"}/>
            </div>
            <div className={""}>
                <span className={"text-white font-bold"}>
                    {sender}
                    {' '}
                </span>
                <span className={"text-dark_666"}>
                    {shortenAddress({address})}
                    {' • '}
                </span>
                <span className={"text-dark_666"}>
                    {date}
                    {' '}
                </span>
                <span className={"block text-white font-semibold"}>
                    {text}
                </span>
                <div className={"flex flex-row justify-between text-dark_555 mt-4"}>
                    <PostIcon icon={faComment}
                              count={61}
                    />
                    <PostIcon icon={faShare}
                              count={12}
                    />
                    <PostIcon icon={faHeart}
                              count={6200}
                    />
                </div>
            </div>
        </div>
    )
}

function PostIcon(props) {
    const {icon, count} = props

    return (
        <div className={""}>
            <FontAwesomeIcon icon={icon}/>
            <span className={"ml-4"}>
                {count}
            </span>
        </div>
    )
}