
const hre = require("hardhat");

async function main() {
 const Token = hre.ethers.getContractFactory("Zeol");
 const ZeolToken= await Token.deploy(70000000,25)
 await ZeolToken.deployed();
 console.log("Zeol Token is  deployed",ZeolToken.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
