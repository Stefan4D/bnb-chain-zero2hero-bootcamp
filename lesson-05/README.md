# Lesson 5 Homework

## Author

Stefan

## Solution

BadgerCoin token deployed to BNB Testnet at:

```
0xdCd721c5Fb4f2c5e70e6e0DE3804151AC1C806b9
```

Contract verified here:
https://testnet.bscscan.com/address/0xdCd721c5Fb4f2c5e70e6e0DE3804151AC1C806b9#code

### Deployment and BSCScan Verification

The following scripts were run to deploy and verify the contract to the BNB testnet:

```shell
npx hardhat run --network bnbTestnet scripts/deploy.js
npx hardhat verify --network bnbTestnet 0xdCd721c5Fb4f2c5e70e6e0DE3804151AC1C806b9
```
