# Lesson 15 Homework

## Author

Stefan

## Solution

BadgerCoin BEP20 deployed to BNB Testnet at:

```
0x32eB1Bb023E5cBf35f0fEB7850e877Fde201D60F
```

Contract verified here: https://testnet.bscscan.com/address/0x32eB1Bb023E5cBf35f0fEB7850e877Fde201D60F#code

### Deployment and BSCScan Verification

The following scripts were run to deploy and verify the contract to the BNB testnet:

```shell
npx hardhat run --network bnbTestnet scripts/deploy.js
npx hardhat verify --network bnbTestnet 0x32eB1Bb023E5cBf35f0fEB7850e877Fde201D60F
```

### Unit Tests

Run the following command to execute the provided unit tests:

```shell
npx hardhat test
```
