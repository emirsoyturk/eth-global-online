import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SidebarItem(props) {
    const {title, icon, to, selected, onClick} = props

    return (
        <button className={`${selected ? 'text-blue' : 'text-white'} duration-100 text-left font-bold text-xl`}
                onClick={() => onClick(title)}
        >
            <FontAwesomeIcon icon={icon}/>
            <span className={"ml-4"}>
                {title}
            </span>
        </button>
    )
}