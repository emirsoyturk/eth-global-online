import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SidebarItem(props) {
    const {title, icon, href, selected} = props

    return (
        <a href={href} target={"_blank"} className={`${selected ? 'text-blue' : 'text-white'} duration-100 text-right font-bold text-xl`}
        >
            <span className={"mr-4"}>
                {title}
            </span>
            <FontAwesomeIcon icon={icon}/>
        </a>
    )
}