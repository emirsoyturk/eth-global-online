import {faBookmark, faHashtag, faHouse, faListDots, faMessage, faRing, faUser} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem.jsx";
export default  function Sidebar() {
    const items = ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile", "More"]
    const icons = [faHouse, faHashtag, faRing, faMessage, faBookmark, faUser, faListDots]
    return (
        <div className={"col-span-1 flex flex-col space-y-6 py-4"}>
            {
                items.map((item, i) => (
                    <SidebarItem key={i}
                                 title={item}
                                 icon={icons[i]}
                                 to={`/${item.toLowerCase()}`}
                                 selected={i === 0}
                    />
                ))
            }
        </div>
    )
}