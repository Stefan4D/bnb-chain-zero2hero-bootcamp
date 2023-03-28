# Lesson 14 Homework

## Author

Stefan

## Solution

BadgerNFT contract with token URIs deployed to BNB Testnet at:

```
0x
```

Contract verified here:

### Deployment and BSCScan Verification

The following scripts were run to deploy and verify the contract to the BNB testnet:

```shell
npx hardhat run --network bnbTestnet scripts/deploy.js
npx hardhat verify --network bnbTestnet 0x...
```

### Unit Tests

Run the following command to execute the provided unit tests:

```shell
npx hardhat test
```
