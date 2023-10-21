import {ethers} from "ethers";
import TIMELINE_ABI from "../../../contract/artifacts/contracts/Timeline.sol/Timeline.json";
const CONTRACT_ADDRESS = "0xAE97c89509cD6cE7Bc0A7D1B53C0e8AcDd7CFB0A"

export async function getAndParsePost(contract, postId, censor) {
    try {
        const result = await contract.getPost(postId, censor);

        const content = result[0];
        const author = result[1];
        const likes = result[2].toNumber();
        const commentsCount = result[3].toNumber();

        return {
            content,
            author,
            likes,
            commentsCount
        };
    } catch (error) {
        console.error('An error occurred:', error);
        return {
            error: error
        }
    }
}

export async function likePost(contract, postId) {
    try {
        await contract.likePost(postId);

        return {
            status: 'OK'
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return {
            status: 'ERROR'
        }
    }
}

export async function getSigner() {
    let provider
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if(provider) {
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
        const network = await provider.getNetwork();
        const timelineContract = new ethers.Contract(CONTRACT_ADDRESS, TIMELINE_ABI.abi, provider)
        return timelineContract
    }
}