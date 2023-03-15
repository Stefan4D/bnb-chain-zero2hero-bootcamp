# Lesson 7 Homework

## Author

Stefan

## Question

Look at the following contract, there are a number of vulnerabilities
and flaws. In your teams try to find all of the problems.
You do not need to fix any of the problems.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BadLotteryGame {
    uint256 public prizeAmount;         // payout amount
    address payable[] public players;
    uint256 public num_players;
    address payable[] public prize_winners;
    event winnersPaid(uint256);

    constructor() {}

    function addNewPlayer(address payable _playerAddress) public payable {
        if (msg.value == 500000) {
            players.push(_playerAddress);
        }
        num_players++;
        if (num_players > 50) {
            emit winnersPaid(prizeAmount);
        }
    }

    function pickWinner(address payable _winner) public {
        if ( block.timestamp % 15 == 0){    // use timestamp for random number
            prize_winners.push(_winner);
        }
    }

    function payout() public {
        if (address(this).balance == 500000 * 100) {
            uint256 amountToPay = prize_winners.length / 100;
            distributePrize(amountToPay);
        }
    }

    function distributePrize(uint256 _amount) public {
        for (uint256 i = 0; i <= prize_winners.length; i++) {
            prize_winners[i].transfer(_amount);
        }
    }
}
```

## Solution

The following security issues and/or vulnerabilities exist in the BadLottery smart contract.

| SWC Ref | Description                                      | Implementation                                                                                                                                                                                       |
| ------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SWC-100 | Function Default Visibility                      | Some functions have been specified as public that should be private                                                                                                                                  |
| SWC-102 | Outdated Compiler Version                        | Contract is using an oudated version of Solidity: 0.8.4 with the latest version being 0.8.19 (as at 15 March 2023)                                                                                   |
| SWC-103 | Floating Pragma                                  | The pragma has been stated as ^0.8.4 rather than being locked to a specific version                                                                                                                  |
| SWC-120 | Weak Sources of Randomness from Chain Attributes | The pickWinner() function uses a weak source of randomness by using block.timestamp.                                                                                                                 |
| SWC-131 | Presence of unused variables                     | the prizeAmount variable is declared but never set or used other than to emit an event                                                                                                               |
| N/A     | Unprotected functions                            | The pickWinner(), payout() and distributePrize() functions are not protected as onlyOwner, so they can be called by any user meaning that any user can make themselves a winner and trigger a payout |
| N/A     | Unused import                                    | The contract imports from the ERC20 smart contract but does not make use of any of this functionality                                                                                                |
| N/A     | == rather than >=                                | addNewPlayer() and payout() only check using == rather than >=                                                                                                                                       |

### General Observations

- The contract does not seem to operate as an actual lottery
- There are code elements declared that appear to serve no purpose (e.g. declaring num_players when this is already stored in players.length)
- Some code executes even if the guard clause fails: per above, the num_players variable will increment even if the if check fails
