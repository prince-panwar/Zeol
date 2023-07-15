//contract/Zeol
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Zeol is ERC20Capped, ERC20Burnable{
    address payable public owner;
    uint256 public blockReward;
   //contructor with cap size and reward value 
    constructor(uint256 cap,uint256 reward ) ERC20("Zeol","ZOL") ERC20Capped(cap * (10 ** decimals())){
       owner = payable(msg.sender);
       _mint(msg.sender, 50000000 *(10**decimals()));
       blockReward = reward *(10**decimals());
    }
     //mint function
    function _mint(address account, uint256 amount) internal virtual override(ERC20,ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }
    //function to give reward to minners
    function _mintMinerReward() internal{
        _mint(block.coinbase,blockReward);
    }
    //this executes before every transcation giving reward to the minner
    function _beforeTokenTransfer(address from,address to,uint256 amount) internal virtual override{
         if(from!=address(0) && block.coinbase!= address(0) && to!=block.coinbase){
         _mintMinerReward();
         }
         super._beforeTokenTransfer(from,to,amount);

  }

 //to change the reward amount when needed
    function setBlockReward(uint256 amount) public onlyOwner{
        blockReward = amount * (10**decimals());
        
    }

    
   
    modifier onlyOwner{
        require(msg.sender==owner,"Only owner can call this function");
        _;
    }

  

}