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
                           proof,
                           input,
                           hash,
                           positive,
                       }) {

    const public_inputs = [
        ...input.map(x => ethers.utils.hexZeroPad(ethers.utils.hexlify(x), 32)),
        ethers.utils.hexZeroPad(ethers.utils.hexlify(positive), 32),
        hash,
    ]

    await timeline.createPost(
        proof,
        public_inputs
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
            proof: '0x00b9d51385b46b29955796a37a8cd07bf9afea70ab3e241512c1e21a190c145c1680a060a32f024f8cac5945587052264fc2e28d65895d315367b8077608fd9911b63fe1f2b7686242c3c426fdc9a5ceba691a839b01ee6a3a263d2ad27b60e71b6ff6e06327a958e0919d423cb0bb977f8cf577ad7c2e286e0a2ef05886b51e2ad4ea30dbda8dc0378bfa81ee35450a398d065ced82c21541ab58724f464e7a213f04f5b5e990d23e6bc2e701fe79583c7d58ea300bba090860298d7039705316e07950ae80fea04e47c36be19cef6b65e7360b16cf51d381f858774b7738841f33d3442c01a6209e72b30e1e9f4f99fdec54766f0473c30cdf94dfb95cc00422eb67837f7b01d2218217c36c3e8cc603be4c321c99e78ff2432843f48329922c8411952f00b441574c1458db3ea9d440a484eba1c6df23ab79b984d20f9b5e030198c02211c7bac46e1f3d4269913da6d96bc500bfd5c508e3ed07efffc17e0f216f996416e9b17528e4bf4a2047155ec443ac0414b15b83f22aec03ce7e51207275ffe34109b1fd6b38a34f4c2239e8b9c89e6eaa389406d233d3e66a750d25c5d17fb3e0766d8b593b1fe9f65e581d79e52feb02db1dff4ac20dda25ffa226da379dafe0552db9f8d5000c4ab1b39199415580ad287d1fda7d7aefd9fa530ffd0c3d36bdfe09885494af93655549c9730dea58a9829bc55464b01f799f782f0d4ec0453401af0b47158b0568cb5ba14a68fcaf0553510892f32caa394077065ec5a9d5e1f4cc6726a28b47b9e4cb3f2f07b6c6985c8e7c5a84c491937e752c153e3c7b72821f6630bbb93e2000af18b527c90b7358b36698632c554b1b7b1382cd82407c766c03c36398a5a5130ba315022d3f4eba2eb86de817e61081c3053bfd9f554f1e5d97a69019e81f13f36db1d0799849249594b5ec3e0ddc17310e34569f5975f3f096d14bc49202132b3ac4f3ab5246788ce6ce8e37f8ca53f90c41fcb9c2924ef73c2235e83044b570134a1612cc20360c6db03cc35429073111e3512f2081cd81b9a05c677410f19088bb30c30137807561beeaed0ed57c541fe5e7f8f0794991cf4443cca64207fbd660199b6d506e0ba195ad0bee5fa47f174f058e0f35f76d4bc164c91de59bad9208c4f70b75638b48e143a112919dec22e2c9055e125afaf490fae4442b1bc706d48504aa1e3170e65b4df0e3fd5d47286ddc675b417645e705bd447736be38196fc4d868bbce08be68e83ac80b44ea1c4131fc1b24a8a2ca6e4b099f7b4ba58bca1e166e03ea0a0a78cee5e810920026344cb8d0e79ce9b149bbc950ca31f5d18c5cf7347c45ccfd0dcb21ae615cae1405aa109b08a6314abfa2b091ced48d41a3edeb5950f17de6ed0900dd477404194baf2870c54248186289bd409e1ff114b5726d1a44fb237f3d36a3861823940326653188ac05b821a341536f35557fbaad60ab1459a06b20856f4732f749f615f3d703dd86eeba396c46dc773975026da76b24c802c3f8806a03fb11230ed6181bccd4f55db3a5bede4b1c6954cc8e432b6dd2b544f25bf7f64fc53d7dd1031871ed614e6b53aaa4985677b31ed4cc2f7773098a8f973fb112b0ac3b713f1c2bd72166179199cf09f0d3857c543baffd313287dc48e25eecb894b7fc5adea4067dc55e6c9361bc47632eee480257fbda5cfd740cc4c1e02643aa6d6505977401d5ef06d1655acc902c6549cfd7c9b8270c38b1c7c603cc784e85a2003f1a0f0769d47be3dc0efe1efc97ec155700fbd25eddd7fbf170f05aab6fc9c0c37398043a2fc85ac53ff5390d48dbaabb16acedc8ddf7987b0a6a1590a39279c726682d8b6046f05d832378d8495b238d233873987ac094ad6e5853ad06f354c225911cd88f17601200ecbfeaf6400f7ae29bbd5f68f476c6296fd516f1e561b1d63328ea90ca7c3aed16da0f17b76104058de89e9775b781f8366046319f26b21f462442ba72e10ce62722d84e12e8d9774a354dd2b372833a22b2510cd3c1eba1e11f9ae41b45dedf376ba1846e70aee90681fd0df12d847c0f045be8085d25247c1af30dc3aab0d847b46abac9f8845ac2ceac492ee885bdfb5666c33cf85ea7172d9267221768f4069145e15bd92e93d19bef5c37fc80b64a0e3b566a8b789cab2db3fbfa855369f37ee9e6eab72efc54e967282e298dbf93869325edf47a2cda26d35cc635db60b88d537290927c3bd13cf68b0baf65051b9d5f6f63fc602b2e1147ef9593f2505027c1142e72d48d79a33a6fd18e5616366e8e5859772d937d1c4fa90ec7fb16440e78754d2f2e4e7d81b52b918468bfa85f63b4f33d06d3df0c93e93be6a740a25599ed344ecd9e72635dbb07aa6ce397a3dad29e1effaca70026b0457f3993bc2d7093e959a1e2fc99e045a2db9a343fd6834c42ac638baf25664ba68ab635837db61481e9a19bd6d14f33786e99884b660ca05e9936774c031c96eaf75a463cddbc38175838d104744213cafece86d96ce58d67bd61ecff26f35c623cdd451cc4cdd8c67fffa41f88cd394881117558b80fb27838f9e3b9270828b54829ecb1ab6c1df705dce2b9e2fc176319b4ac3f9d0989babe08ced019f6403f641b13095bbbcf1427f9828e9c4438d73567aa836315e3ae1b853ed429d5bdbae5a281634da9cd25fdf4125f7d1df76fb9e08691227871e5f7eb9dd00d0f593de2a44c0fc3ed1a6f7cc783a957688688b8379c11b816825681e9eaf620ad4333c0d7b6e5f280ad6f7d1c4d5059e6fdea304822239196885afbe8381d03e6deb6bdd9819268c3fab8fbefbe9a34318d032e9f37a4273498cb85e68543043618621fdb31272cae07a45ee5c14940b4aa9107228835b1c9d54a7b4bcc1109f6d67433d629c7c1e97686e23b23c6017e824a042954095d9b739a20cae0ed2bc2f8ccea853a2fc8a49795719f896cf9920048160335fd758bc71c14600bee15b35d6c94176ac9b97e814e27e93b8426a5c713a8e7a149d2fcb8965e166981',
            input: [
                1818,
                16644,
                50637,
                16268,
                8022,
                789,
                20236,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            hash: "0x0736b20f21b7ba75e82106e4f32b6f8aac688e3e8f235772b08d65e8dd15532a",
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