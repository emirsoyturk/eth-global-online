import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function Navbar(props) {
    const {censor, setCensor} = props

    const handleClick = () => {
        setCensor(!censor)
    }

    return (
        <div className={"bg-dark_111 max-w-zkml mx-auto mb-4"}>
            <FontAwesomeIcon icon={censor ? faLock : faLockOpen}
                             className={"cursor-pointer"}
                             size={"2xl"}
                             color={"white"}
                             onClick={handleClick}
            />
        </div>
    )
}