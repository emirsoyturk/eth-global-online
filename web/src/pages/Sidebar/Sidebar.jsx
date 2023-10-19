import {faBookmark, faHashtag, faHouse, faListDots, faMessage, faRing, faUser} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem.jsx";
import {useState} from "react";
export default  function Sidebar() {
    const [selected, setSelected] = useState("Home")
    const items = ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile", "More"]
    const icons = [faHouse, faHashtag, faRing, faMessage, faBookmark, faUser, faListDots]

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