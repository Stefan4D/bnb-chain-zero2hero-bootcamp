# Lesson 6 Homework

## Author

Stefan

## Solution

BadgerNFT contract deployed to BNB Testnet at:

```
0xF11301F0099b69ba131e9D5Dc6923022fff63574
```

Contract verified here:
https://testnet.bscscan.com/address/0xf11301f0099b69ba131e9d5dc6923022fff63574#code

### Deployment and BSCScan Verification

The following scripts were run to deploy and verify the contract to the BNB testnet:

```shell
npx hardhat run --network bnbTestnet scripts/deploy.js
npx hardhat verify --network bnbTestnet 0xF11301F0099b69ba131e9D5Dc6923022fff63574
```
