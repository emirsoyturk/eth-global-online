// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
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
    const Timeline = await hre.ethers.getContractFactory("Timeline");
    const timeline = await Timeline.deploy(verifierAddress);
    await timeline.deployed();

    console.log(`deployed to ${timeline.address}`);
}

async function post({
                                  verifierAddress
                              }) {
    const Timeline = await hre.ethers.getContractFactory("Timeline");
    const timeline = await Timeline.deploy(verifierAddress);
    await timeline.deployed();

    console.log(`deployed to ${timeline.address}`);
}

async function main() {
    const verifierAddress = await deployVerifier()
    await deployTimeline({
        verifierAddress: verifierAddress
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
