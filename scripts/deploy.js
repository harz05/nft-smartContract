// Imports
const { ethers, run, network } = require("hardhat");

// Custom delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Async main function
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();

  // Await deployment completion
  await simpleStorage.waitForDeployment();
  console.log(`Deployed contract to: ${simpleStorage.target}`);

  // Verify on Etherscan if on Sepolia network
  // if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
  console.log("Waiting for block confirmations...");
  const txHash = simpleStorage.deploymentTransaction().hash;
  await waitForConfirmations(txHash, 6); // Wait for 6 confirmations

  await verify(simpleStorage.target, []);
  //}

  // Interact with the deployed contract
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

// Function to wait for block confirmations
async function waitForConfirmations(txHash, confirmations) {
  let receipt;
  let currentConfirmations = 0;

  while (currentConfirmations < confirmations) {
    receipt = await ethers.provider.getTransactionReceipt(txHash);
    if (receipt && receipt.confirmations) {
      currentConfirmations = receipt.confirmations;
    }
    if (currentConfirmations < confirmations) {
      await delay(3000); // Wait 3 seconds before checking again
    }
  }
}

// Verification function
async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

// Execute main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
