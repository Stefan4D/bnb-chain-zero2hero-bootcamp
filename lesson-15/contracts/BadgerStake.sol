// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

interface IStakingContract {
    function stake(uint256 amount) external;
    function unstake(uint256 amount) external;
    function getTimeWeightedStake(address account) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract BadgerStake {
    IERC20 private _token;
    mapping(address => uint256) private _balances;
    struct Stake {
        uint256 amount;
        uint256 depositBlock;
    }
    mapping(address => Stake[]) private _stakes;
    struct Withdrawal {
        uint256 amount;
        uint256 withdrawalBlock;
    }
    mapping(address => Withdrawal[]) private _withdrawals;

    constructor(IERC20 token) {
        _token = token;
    }

    /**
     * @dev Stake tokens
     * @param amount The amount of tokens to stake
     */
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(_token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        _balances[msg.sender] += amount;
        _stakes[msg.sender].push(Stake(amount, block.number));
    }

    /**
     * @dev Unstake tokens
     * @param amount The amount of tokens to unstake
     */
    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        require(_token.transfer(msg.sender, amount), "Transfer failed");
    }

    /**
     * @dev Get the time weighted stake for an account
     * @param account The account to get the time weighted stake for
     * @return The time weighted stake for the account
     */
    function getTimeWeightedStake(address account) external view returns (uint256) {
        uint256 timeWeightedStake = 0;
        for (uint256 i = 0; i < _stakes[account].length; i++) {
            Stake memory stake = _stakes[account][i];
            timeWeightedStake += stake.amount * (block.number - stake.depositBlock);
        }
        // minus the amount of tokens unstaked
        for (uint256 i = 0; i < _withdrawals[account].length; i++) {
            Withdrawal memory withdrawal = _withdrawals[account][i];
            timeWeightedStake -= withdrawal.amount * (block.number - withdrawal.withdrawalBlock);
            // TODO: above line is not correct as it does not take into account the time the tokens were staked
        }
        return timeWeightedStake;
    }

    /**
     * @dev Get the balance of an account
     * @param account The account to get the balance for
     * @return The balance of the account
     */
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }
}