import {faBookmark, faHashtag, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem.jsx";
import {useState} from "react";

export default function Sidebar(props) {
    const {selected, setSelected} = props
    const items = ["Home", "Messages", "Profile"]
    const icons = [faHouse, faHashtag, faUser]

    const handleClick = (item) => {
        setSelected(item)
    }

    return (
        <div className={"col-span-1 flex flex-col space-y-6 py-4"}>
            {
                items.map((item, i) => (
                    <SidebarItem key={i}
                                 title={item}
                                 icon={icons[i]}
                                 to={`/${item.toLowerCase()}`}
                                 selected={selected === item}
                                 onClick={handleClick}
                    />
                ))
            }
        </div>
    )
}