const {expect} = require("chai");
const {ethers} = require("hardhat");
const hre = require("hardhat");

async function deployVerifier() {
    const UltraVerifier = await hre.ethers.getContractFactory("UltraVerifier");
    const ultraVerifier = await UltraVerifier.deploy();
    await ultraVerifier.deployed();

    return ultraVerifier.address
}

async function deployTimeline({
                                  verifierAddress
                              }) {
    const timeline = await ethers.deployContract("Timeline", [verifierAddress]);
    await timeline.deployTransaction.wait()
    return timeline
}

async function newPost({
                           timeline,
                           content,
                           proof,
                           positive,
                       }) {
    await timeline.createPost(
        ethers.utils.hexlify(content),
        ethers.utils.hexlify(proof),
        [
            ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(positive), 32),
        ]
    )
}

async function likePost({
                            timeline,
                            postID
                        }) {
    await timeline.likePost(postID)
}

describe("Timeline contract", function () {
    it("Deployment", async function () {
        const [owner] = await ethers.getSigners();

        const verifierAddress = await deployVerifier()
        const timeline = await deployTimeline({
            verifierAddress: verifierAddress
        })

        const postCount = await timeline.postsCount()
        expect(postCount).to.equal(0);
    });

    it("Post", async function () {
        const verifierAddress = await deployVerifier()
        const timeline = await deployTimeline({
            verifierAddress: verifierAddress
        })

        await newPost({
            timeline: timeline,
            content: 0,
            proof: 0,
            positive: 1
        })

        await newPost({
            timeline: timeline,
            content: 0,
            proof: 0,
            positive: 1
        })

        const postCount = await timeline.postsCount()
        expect(postCount).to.equal(2);
    });

    it("Like", async function () {
        const owner = (await ethers.getSigners())[0]

        const verifierAddress = await deployVerifier()
        const timeline = await deployTimeline({
            verifierAddress: verifierAddress
        })

        timeline.connect(owner)

        await newPost({
            timeline: timeline,
            content: 0,
            proof: 0,
            positive: 1
        })

        await likePost({
            timeline: timeline,
            postID: 0
        })

        const postCount = await timeline.postsCount()
        expect(postCount).to.equal(1);

        const isLiked = await timeline.isLikedBy(0, owner.address)
        expect(isLiked).to.equal(true)
    });
});