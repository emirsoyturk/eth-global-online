require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 50000
            }
        }
    },
    networks: {
        hardhat: {
            chainId: 1337
        },
        ganache: {
            url: "http://127.0.0.1:7545",
            accounts: [
                `0x6cf3c6e37f10b730c685c35b72067b0c4aba068f82c8d270ca6c6cdf57e9f5fa`
            ]
        },
        sepolia: {
            url: "https://ethereum-sepolia.publicnode.com",
            accounts: [
                process.env.PRIVATE_KEY
            ]
        },
        mantle_testnet: {
            url: "https://rpc.testnet.mantle.xyz",
            accounts: [
                process.env.PRIVATE_KEY_2
            ]
        },
        scroll_testnet: {
            url: "https://scroll-sepolia.blockpi.network/v1/rpc/public",
            accounts: [
                process.env.PRIVATE_KEY_2
            ]
        }
    }
}