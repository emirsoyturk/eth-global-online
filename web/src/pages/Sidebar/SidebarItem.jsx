import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SidebarItem(props) {
    const {title, icon, to, selected} = props

    return (
        <button className={`${selected ? 'text-blue' : 'text-white'} text-left font-bold text-xl`}>
            <FontAwesomeIcon icon={icon}/>
            <span className={"ml-4"}>
                {title}
            </span>
        </button>
    )
}