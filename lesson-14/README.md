# Lesson 14 Homework

## Author

Stefan

## Solution

BadgerNFT contract with token URIs deployed to BNB Testnet at:

```
0xd12c0a69b0b0dE2e4D1d2e7291D35F445629C498
```

Contract verified here: https://testnet.bscscan.com/address/0xd12c0a69b0b0dE2e4D1d2e7291D35F445629C498#code

### Deployment and BSCScan Verification

The following scripts were run to deploy and verify the contract to the BNB testnet:

```shell
npx hardhat run --network bnbTestnet scripts/deploy.js
npx hardhat verify --network bnbTestnet 0xd12c0a69b0b0dE2e4D1d2e7291D35F445629C498
```

### Unit Tests

Run the following command to execute the provided unit tests:

```shell
npx hardhat test
```
