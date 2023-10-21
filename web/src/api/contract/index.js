import {ethers} from "ethers";
import TIMELINE_ABI from "../../../../contract/artifacts/contracts/Timeline.sol/Timeline.json";
import {indexesToSentence} from "../backend/index.js";

const networks = [
    {
        contractAddress: "0x15C01772ba72Fb231463ABFA340F478680Eca902",
        chainName: "Mantle Testnet",
        rpcUrls: ["https://rpc.testnet.mantle.xyz"],
        chainId: "0x1389",
        nativeCurrency: {
            name: "MNT",
            symbol: "MNT",
            decimals: 18
        },
        blockExplorerUrls: ["https://explorer.testnet.mantle.xyz"]
    },
    {
        contractAddress: "0x15C01772ba72Fb231463ABFA340F478680Eca902",
        chainName: "Scroll Sepolia Testnet",
        rpcUrls: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"],
        chainId: "0x8274f",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://sepolia.scrollscan.dev"]
    }
]

let currentNetwork = networks[0]

export async function getAndParsePost(contract, postId) {
    try {
        const result = await contract.getPost(postId);

        const intIndexes = result[0].map(x => {
            return parseInt(x, 16)
        })

        const content = (await indexesToSentence(intIndexes)).join(' ');
        const author = result[1];
        const likes = result[2].toNumber();
        const commentsCount = result[3].toNumber();
        const positive = result[4] === "0x0000000000000000000000000000000000000000000000000000000000000001"

        return {
            content,
            author,
            likes,
            commentsCount,
            positive
        };

    } catch (error) {
        console.error('An error occurred:', error);
        return {
            error: error
        }
    }
}

export async function likePost(postId) {
    try {
        const contract = await getTimelineContract()
        const signer = await getSigner()

        await contract
            .connect(signer)
            .likePost(postId)

        return {
            status: 'OK'
        }
    } catch (error) {
        return {
            err: error.message
        }
    }
}

export async function getSigner() {
    let provider
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (provider) {
        return provider.getSigner()
    }

}

export async function getTimelineContract() {
    let provider
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (provider) {
        return new ethers.Contract(currentNetwork.contractAddress, TIMELINE_ABI.abi, provider)
    }
}

export async function verify(postId) {
    try {
        const contract = await getTimelineContract()
        const verified = await contract.verify(postId)

        return verified
    } catch (e) {
        console.log(e)
    }
}

export function askToChangeNetwork(id) {
    const newNetwork = networks[id]
    const req = window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: newNetwork.chainId,
            rpcUrls: newNetwork.rpcUrls,
            chainName: newNetwork.chainName,
            nativeCurrency: newNetwork.nativeCurrency,
            blockExplorerUrls: newNetwork.blockExplorerUrls
        }]
    })

    req
        .then(r => {
            currentNetwork = newNetwork
        })
        .catch(e => {
            console.log(e)
        })
}