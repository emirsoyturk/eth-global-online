import {shortenAddress} from "../../utils/index.js";
import {getAndParsePost, getSigner, getTimelineContract} from "../../api/index.js";
import {useEffect, useState} from "react";

export default function Profile(props) {
    const [address, setAddress] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            const contract = await getTimelineContract()
            const signer = await getSigner()
            const accounts = await signer.provider.listAccounts()
            setAddress(accounts[0])
            if (contract) {
                const profile = await contract
                    .connect(signer)
                    .getUserProfile(accounts[0])

                setUsername(profile[0])
                setBio(profile[1])
            }
        };

        fetchProfile()
    }, []);


    return (
        <div className={"col-span-3 grid grid-cols-1 border-collapse w-full"}>
            <div className="relative bg-dark_333 h-40 w-full aspect-square shadow-lg mb-4">
                <div
                    className="absolute -left-5 -bottom-10 bg-dark_666 h-20 w-20 rounded-full aspect-square shadow-lg"
                />
            </div>
            <div>
                <span className="text-white font-bold text-lg leading-tight ml-20">
                    {username}
                </span>
                <span className="text-dark_666 text-sm ml-2">
                     {' • '}
                    {shortenAddress({address})}
                    {' • '}
                </span>
                <span className="block ml-20 text-dark_666 text-sm">
                    {bio}
                </span>
            </div>
        </div>
    )
}