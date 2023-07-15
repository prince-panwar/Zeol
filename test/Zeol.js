const {expect} =require("chai");
const hre=require("hardhat");

describe("Zeol contract",function(){
//global vars
let Token;
let ZeolToken;
let owner;
let addr1;
let addr2;
let tokenCap=70000000;
let tokenBlockReaward=50;

beforeEach(async function(){

    Token = await ethers.getContractFactory("Zeol");
    [owner,addr1,addr2] = await hre.ethers.getSigners();
   
    ZeolToken = await Token.deploy(tokenCap,tokenBlockReaward);

});

describe("deployment",function(){
    it("Should set the right owner",async function(){
        expect(await ZeolToken.owner()).to.equal(owner.address);
    });

    it("Should send the total supply to the owner", async function(){
        const ownerBalance = await ZeolToken.balanceOf(owner.address);
        expect(await ZeolToken.totalSupply()).to.equal(ownerBalance);
    });
    it("Should set Max supply to the argument passed during deployment",async function(){
        const cap = await ZeolToken.cap();
        expect(Number(hre.ethers.formatUnits(cap,18))).to.equal(tokenCap);
    });
    it("Should set blockreward to the argument passed during deployment",async function(){
        const blockreward=await ZeolToken.blockReward();
        expect(Number(hre.ethers.formatUnits(blockreward,18))).to.equal(tokenBlockReaward);
    });

});

describe("Transaction", function(){
 
    it("Should transfer tokens between accounts", async function(){
   await ZeolToken.transfer(addr1.address,50);
   const addr1Balance=await ZeolToken.balanceOf(addr1.address);
   expect(addr1Balance).to.equal(50);
   //transfer tokens from addr1 to addr2
   // We use .connect(signer) to send a transaction from another account
   await ZeolToken.connect(addr1).transfer(addr2.address,50);
   const addr2Balance = await ZeolToken.balanceOf(addr2.address);
   expect(addr2Balance).to.equal(50);

  });
  
  it("Should faild when sender does not have enough tokens",async function(){
    const initialBalance = await ZeolToken.balanceOf(owner.address);
     // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        ZeolToken.connect(addr1).transfer(owner.address,1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      //owner balance should't changed
      expect(await ZeolToken.balanceOf(owner.address)).to.equal(initialBalance);
  });

  it("should update baalance after a transfer", async function(){
    const initialOwnerBalance= await ZeolToken.balanceOf(owner.address);
    //send 100 from owner to addr

    await ZeolToken.transfer(addr1.address,100);
    await ZeolToken.transfer(addr2.address,50);
    
    expect( await ZeolToken.balanceOf(owner.address)).to.equal(initialOwnerBalance-BigInt(150));
    expect( await ZeolToken.balanceOf(addr1.address)).to.equal(100);
    expect( await ZeolToken.balanceOf(addr2.address)).to.equal(50);
  });

});



});