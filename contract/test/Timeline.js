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

    console.log(timeline.address)
    return timeline
}

async function newPost({
                           timeline,
                           content,
                           proof,
                           positive,
                       }) {
    await timeline.createPost(
        content,
        proof,
        [
            ethers.utils.hexZeroPad(ethers.utils.hexlify(790874), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(78972), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(69134), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32),
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

    it("Verify", async function () {
        const verifierAddress = await deployVerifier()
        const timeline = await deployTimeline({
            verifierAddress: verifierAddress
        })

        await newPost({
            timeline: timeline,
            content: "Selamlar",
            proof: '0x280a94bc9771cc680fe4eb31d06744751c029e3f6f7dec2217940a3d1bf7394b18e30439c8c71b5e697325f9613cebb141d8ab537671adb613f8666ec238b78602240ff840357ca7dd0a9d8de69a19a91afe828501048742942ea3a51d5f86d60d87441c960390cb73b75464322efb3186892a5d331744c5afd188119185ee84124007e776bb32edf6fdb6815eceb94fe69a5b6403c497606c5e8cd06df34a5a22e4bd93906cc52d33e1ce28fed2d2f969cb953107c95f5a0ce12a4a8d042aaa24d83df2ea94f7d23e5f4f9328dff43b76a4f353544fa3d6bb346325b5a7639b08dcf626115c78cfd58502b5f1e54323e58af39acff9132c54eec024d758262b0678b9a977cb0f570ec5d0afe5a67f670c3c7d388621cc73d8b359d84a941b262e1380a72d8c8d568f805f883ba3085e08d9f4650a18bb4355969925cadbf6da1a6e3c9c8ac349f194836b28a7242b4fce686e2c2afba6d1e8271500215fc1c60e76498b82749eef016be422897576f8e252a8ff3823d8c0f55bd1db1bb59ec411e450ec0045cd5e3afbc28821df6b067a1ef770f95a3c23e370f4483e9c0c921a9ba0326b43e379deaee71dfb2c6f7db07aa7a325c812b30580bbd13e43fa581a248da783c87863299cca684d1cf56d959c7d7d1a25b1779e50c3c259787fc421b527f39d416aefdc4b1655604f3496d584ccf1be7ea12f3b99549cf8040dcd11980c587a3817b0e4c809a530cad370eef4fbdd988a38314a881701cedbcc38295bd359be2eabcfe6ac2add6680a10642cc18fd3b020357e40a06e88af4cc920d2547e7a703be50dc1a74417011b0ba933141446a2836ff33e96aedd4abf8dd2ddcd4e62e2a55584f3e85e8b4db276df3b3eac3153880471b7edc63fb1b444a03e82544af1c1043155d1b789c62c2805654da5704230003970c25715c201f601fe666e85a2adf8385451e71708dedb4392ee51e00875526b22743b84e1672cd15fd857acd4619c482d2726e5e9036dc94f4e033831ea0cbac8b191d97f7ece90e2009016cf0c0eea245b9f62fa322afcc46a2c04a1e5d70209b5a1049e32f5e21eafa199b2b45777582d45e62479f3634b5b063e5da19df3146201f691c6461199a2fa33780079a238d78e6017ff2d1371f3fca743b0b62f4d988aafb80a4070e55a42e9a50b3f59833b187bac7a504e5357bfa414f4269afd9a01873f9ee7221a4ec551a3c397c405b3650037e79990da2807b5d2053331cb784519753276e0b73fc262b823468ba8121388ab1e9c513762b714d8081385d8cc43e0ea7bfbc0011c6fab4d5f02f4205f95056685b097df2bbf12ca966c9142e8d64998ed6f42ffc9508015357084dc60f5feba6aee5fdb3cd60087e41a71d64aba8ae04e5500e5a916b425aa1ec18b20df48254dfd0e0727948ea79b59801c9e725c764fe360bdc8c440afae86ceca04c0b3aa26db011d5b168da52f16153b7b7cf9c2504960b088bb38800193050c80ef7e5348ffeffb6d51893fd76b1550d9e3b7a3925ab1d62833fca5f37237ad095e17ac684cacb4b8ff60a9563b633f6959c49ac6a232bcdb3e8431c60cf1d07f6ab4713c7109c96e8b8035da42564da9f5afcecf60205011caa0c790dd6cbff12a150e84cdb81fc32ad90783567aad2b1b27d5145f30de857ddd099d5dd0c5022ab520085142f85e90138ae4fe91a822417c233129a0f73efda04392683d4cad1302239776bc306911dcd33753be49099e18271a2e40d7326f37744ab0616038ad8339081a5a96052276871067ac9c5c50782a72dcf064dfde3aee4ad7096a5e75865e32fe206335d26fba4fcf3fd36b5a13649d0f51c7d482ec12b3fd2c24485ce58f1cfcbf207c4d266d4f76d8f7e2ce4d2ac72c7102441c11ae131b8cfe7133465c773be94be9988f112c83736c88931c624474f128b1fd26b77c7d165c02e39c2ab5c1aea07e156f63dbfe178ad857502eec3781416b7ce9f1718782e3adcbe92e44e727d8889738ac2e53442bbfb3ec32d53c215a24fcad2b6691ef6b58b43631d40ca110931901f480a870cca7108836be40c172de7c70655b9c5bf3039c833563321a489d9acb3cd2fd9d6d8e6d243aa745610ff87d637d8772a9d457fb4f27269c35687393a61b89a8eae9f0fab42b0332e265c8f0d74cebbf288f24916ac480979541162820658e6fea88b373ba39f58371577bc50ededadbc0945f415df9f339904f0bacb4503804672f97e95fa0cbfce149777565cdd9b26137b27f4eae0f73c255b52f0ee4d5ebc2194f0fe831b15202179981e014c104123325f2d09493ed65d2564758e37afe0bf8e77bbf13868b61de8adc74281962da5fd909925e4d798299e9c27bce2fbfc137e2ace78d714830ccfa3e4615e309f6a84209d63a339431177d18c370a0c76afd66ccf1ff739161e8e163b9e6ed8c33bc08ff6833458e112baaf2217807cfa080c265d397374900f246bea128a06e49f47c6e4b8b924af097acff326238948082dd0a4b43193f727ac8262f73543278e28c778262da4055305085207e0af4ff831140dfee691b42ce9732e8488bf76c5f5bd4a3eba7f39399fce0303be9444aaef66ba837322392d168134e565a756f79e69099cdc189d0e16ee2d97a2648423073a78f54c4067233f78d698beaec3d6f8de2eedab91e59c99d214beb45439e3ab693df13fcf6b1a1659f66d2cd549bacedf45366edd4c1f99a9845ad4ff1a65abdf48c95a760910ed3b16419afbcf9ea4e05b7f3228b2a29980f3f6f5a9fae7ac5553a1751ca707c41c3616092255827ae171c7f5741925995863931654db69accb5e798fc3452b96e181f11017d961f90a11e5ecab37f869fc982b689304982e7f7d9d0a05c20da5b802f172eee82cdc17e2d2bb40ee5b05ef752f9b93a24a9167af72cefeae1756886ded39b70a553392091087c209f2c345c98d6bd0e020bcde895f30ff3b1270aaa23245542d3d29103eba08c443f0df69e3ed2e30c11f569e4e98d5980e',
            positive: 0
        })
    })

    // it("Post", async function () {
    //     const verifierAddress = await deployVerifier()
    //     const timeline = await deployTimeline({
    //         verifierAddress: verifierAddress
    //     })
    //
    //     await newPost({
    //         timeline: timeline,
    //         content: "Selamlar",
    //         proof: 0,
    //         positive: 1
    //     })
    //
    //     await newPost({
    //         timeline: timeline,
    //         content: "Selamlar",
    //         proof: 0,
    //         positive: 1
    //     })
    //
    //     const postCount = await timeline.postsCount()
    //     expect(postCount).to.equal(2);
    // });
    //
    // it("Like", async function () {
    //     const owner = (await ethers.getSigners())[0]
    //
    //     const verifierAddress = await deployVerifier()
    //     const timeline = await deployTimeline({
    //         verifierAddress: verifierAddress
    //     })
    //
    //     timeline.connect(owner)
    //
    //     await newPost({
    //         timeline: timeline,
    //         content: "Selamlar",
    //         proof: 0,
    //         positive: 1
    //     })
    //     await newPost({
    //         timeline: timeline,
    //         content: "Selamlar",
    //         proof: 0,
    //         positive: 1
    //     })
    //
    //     await newPost({
    //         timeline: timeline,
    //         content: "AAAAAAA",
    //         proof: 0,
    //         positive: 0
    //     })
    //     await newPost({
    //         timeline: timeline,
    //         content: "Selamlar",
    //         proof: 0,
    //         positive: 1
    //     })
    //     await newPost({
    //         timeline: timeline,
    //         content: "Kötü cümlelerrr",
    //         proof: 0,
    //         positive: 0
    //     })
    //     await newPost({
    //         timeline: timeline,
    //         content: "Selamlar",
    //         proof: 0,
    //         positive: 1
    //     })
    //
    //     await likePost({
    //         timeline: timeline,
    //         postID: 0
    //     })
    //
    //     const postCount = await timeline.postsCount()
    //     expect(postCount).to.equal(6);
    //
    //     const isLiked = await timeline.isLikedBy(0, owner.address)
    //     expect(isLiked).to.equal(true)
    // });
});