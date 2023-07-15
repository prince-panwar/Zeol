
const hre = require("hardhat");
async function main() {
  const deployedContract = await ethers.deployContract("Zeol",[70000000,25]);

  await deployedContract.waitForDeployment();

  console.log("Zeol Contract Address:", await deployedContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
