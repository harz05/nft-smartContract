// Import Hardhat's ethers module
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const MarketFactory = await ethers.getContractFactory("market");
  console.log("Deploying contract...");

  // Deploy the contract
  const marketContract = await MarketFactory.deploy();

  // Wait for the contract to be deployed
  await marketContract.waitForDeployment();

  console.log(`Contract deployed at address: ${marketContract.target}`);
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
