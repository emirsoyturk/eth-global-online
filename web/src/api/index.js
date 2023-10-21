import {ethers} from "ethers";
import TIMELINE_ABI from "../../../contract/artifacts/contracts/Timeline.sol/Timeline.json";

const CONTRACT_ADDRESS = "0xbd9BFbD8bBf8e35b6dD520BEB3F80c18C91D770f"

export async function getAndParsePost(contract, postId, censor) {
    try {
        const result = await contract.getPost(postId, censor);

        const intIndexes = result[0].map(x => {
            return (
                x !== '0x0000000000000000000000000000000000000000000000000000000000000000'
                    ? parseInt(x, 16)
                    : null
            )
        })
        const content = (await indexesToSentence(intIndexes)).join(' ');
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
        return new ethers.Contract(CONTRACT_ADDRESS, TIMELINE_ABI.abi, provider)
    }
}

export async function sentenceToIndexes(sentence) {
    const body = JSON.stringify({sentence: sentence})
    const json = await fetch("http://localhost:3000/sentence/to/indexes", {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )

    return await json.json()
}

export async function indexesToSentence(indexes) {
    indexes = indexes.filter(x => x !== 0)
    const body = JSON.stringify({indexes: indexes})
    const json = await fetch("http://localhost:3000/sentence/from/indexes", {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )

    return await json.json()
}

export async function prove(indexes, hash, positive) {
    const body = JSON.stringify({input: indexes, hash: hash, positive: positive ? 1 : 0})

    const json = await fetch("http://localhost:3000/noir/prove", {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return await json.json()
}

export async function mimcHash(indexes) {
    const body = JSON.stringify({indexes: indexes})

    const json = await fetch("http://localhost:3000/noir/hash", {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return await json.json()
}
