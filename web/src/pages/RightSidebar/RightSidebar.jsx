import {faCode, faComputer, faPerson, faRobot} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem.jsx";
import {useState} from "react";

export default function RightSidebar(props) {
    const {selected, setSelected} = props
    const items = ["Github", "Model", "Circuit", "Me"]
    const icons = [faCode, faRobot, faComputer, faPerson]
    const links = [
        "https://github.com/Volthai7us/ZKML-Censorship",
        "https://ethglobalonline.infura-ipfs.io/ipfs/bafybeic543flywsrlbdwljuh3pbdkemt3u4rhsz3qw4t5r67ctegopa4ji",
        "https://ethglobalonline.infura-ipfs.io/ipfs/bafybeihu6m3mfdzayqkbq4c5gewzopo2ukqeynpzfihw7pmypkutpvifx4",
        "https://linktr.ee/emir_soyturk"
    ]

    return (
        <div className={"col-span-1 flex flex-col space-y-6 py-4"}>
            {
                items.map((item, i) => (
                    <SidebarItem key={i}
                                 title={item}
                                 icon={icons[i]}
                                 href={links[i]}
                                 selected={selected === item}
                    />
                ))
            }
        </div>
    )
}