# Lesson 1 Homework

## Author

Stefan

## Question

### Block Explorer

Use the main net block explorer to find

1. How many users are holding the pancake swap token 'cake'?
2. Approximately, how many unique addresses are there?
3. Who validated the first block after the genesis block?
4. Roughly how many transactions are pending
5. Which contract is consuming most gas ?
6. How much gas is needed to have a transaction get in a block within 5–10s?
7. What is special about this transaction
   0x1bfbff8411ed44e609d911476b0d35a28284545b690902806ea0a7ff0453e931

## Solution

Number of CAKE holders: 1,332,050
Unique addresses: 1,332,050

Block 0 validator: 0xfffffffffffffffffffffffffffffffffffffffe
Block 1 validator: 0x2a7cdd959bfe8d9487b2a43b33565295a698f7e2 (Validator: Sigm8)

Pending transactions: 128
Contact consuming most gas: PancakeSwap: Router v2 (0x10ED43C718714eb63d5aA57B78B54704E256024E)

Gas needed for 5-10 seconds: 5 gwei

What is special about this transaction 0x1bfbff8411ed44e609d911476b0d35a28284545b690902806ea0a7ff0453e931?: It's the transaction that deployed the PancakeSwap router contract.

```
[Contract 0x10ed43c718714eb63d5aa57b78b54704e256024eCreated] (PancakeSwap: Router v2)
```
