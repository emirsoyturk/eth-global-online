import {ethers} from "ethers";
import TIMELINE_ABI from "../abi/Timeline.json";
import {indexesToSentence} from "../backend/index.js";

const networks = [
    {
        contractAddress: "0x4F010A974735dB2eb1572846e826263D5Cf5dc74",
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
        contractAddress: "0x0bD0Ce160Ea0d7c2C9C853F8A7663bd1D82CF50d",
        chainName: "Scroll Sepolia Testnet",
        rpcUrls: ["https://scroll-sepolia.public.blastapi.io"],
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

export async function getAndParseComment(contract, postId, commentId) {
    try {
        const result = await contract.getComment(postId, commentId);

        const intIndexes = result[0].map(x => {
            return parseInt(x, 16)
        })

        const content = (await indexesToSentence(intIndexes)).join(' ');
        const author = result[1];
        const positive = result[2] === "0x0000000000000000000000000000000000000000000000000000000000000001"

        return {
            content,
            author,
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

export async function getProvider() {
    let provider
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    return provider
}

export async function getChain(provider) {
    const {chainId} = await provider.getNetwork()
    const chain = networks.find(network => network.chainId == chainId)
    return chain
}

export async function getTimelineContract() {
    let provider
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (provider) {
        const chain = await getChain(provider)
        currentNetwork = chain
        const timeline = new ethers.Contract(chain.contractAddress, TIMELINE_ABI.abi, provider)
        return timeline
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

    currentNetwork = newNetwork
}