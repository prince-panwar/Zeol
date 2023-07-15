# Zeol Token

## Description
Zeol is an ERC20 token implemented on the Ethereum blockchain. It is capped and supports burning of tokens. The token contract extends the OpenZeppelin ERC20, ERC20Capped, and ERC20Burnable contracts.

## Usage

### Prerequisites
- Node.js and npm installed
- Hardhat installed globally (`npm install -g hardhat`)

### Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd Zeol`
3. Install dependencies: `npm install`

### Testing
1. Run the Hardhat tests: `npx hardhat test`

### Deployment
1. Update the deployment script `scripts/deploy.js` if necessary.
2. Run the deployment script: `npx hardhat run --network <network-name> scripts/deploy.js`

Make sure to replace `<network-name>` with the desired network configuration from your `hardhat.config.js` file.

### Contract Details
- Contract name: `Zeol`
- Symbol: `ZOL`
- Decimals: 18
- Cap: The maximum supply of tokens is 70000000 ZOL.
- Block Reward: The amount of tokens minted and rewarded to the miner is 25Zols.


The Token is currently deployed on the sepolia testing network at address -0x1aF86AB880C9a10Ee3b72a15D104cF0e5b9c12F6
