require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number"); // Load environment variables from .env file
const url = process.env.SEPOLIA_RPC_URL;
const privatekey = process.env.PRIVATE_KEY; // or the URL of your RPC provider
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.27", // or the version you're using
  networks: {
    Sepolia: {
      url: url,
      accounts: [privatekey],
      chainId: 11155111,
    },
    localStorage: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY, // Add your Etherscan API key here
    },
  },
};
