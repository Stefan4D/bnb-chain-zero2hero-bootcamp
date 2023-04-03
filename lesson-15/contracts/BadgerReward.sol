// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IStakingContract {
    function stake(uint256 amount) external;
    function unstake(uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

contract BadgerReward {
    address public stakingContract;
    address public rewardToken;


    constructor(address _stakingContract, address _rewardToken) {
        // set the staking contract address
        // set the reward token address
        stakingContract = _stakingContract;
        rewardToken = _rewardToken;

    }

    function reward(address token, address account, uint256 amount) external {
        SafeERC20.safeTransfer(IERC20(token), account, amount);
    }

    // calculate the reward amount
    function calculateReward(address account) external view returns (uint256) {
        uint256 amount = 0;
        // calculate the reward amount based on the amount of time the account has staked
        // and the amount of tokens staked
        uint256 rewardFactor;
        uint256 blockNumber = block.number;
        uint256 stakedAmount = IStakingContract(stakingContract).balanceOf(account);
        if (stakedAmount = 0) {
            return 0;
        }
        uint256 totalStaked = IStakingContract(stakingContract).balanceOf(address(this));
        // calculate eligibility for rewards based on time-weighted staking
        // calculate the reward amount based on the amount of time the account has staked
        // and the amount of tokens staked
        if (blockNumber < START_BLOCK) {
            rewardFactor = 0;
        } else if (blockNumber >= END_BLOCK) {
            rewardFactor = eligibleAmount / totalStaked;
        } else {
            amount = eligibleAmount * (blockNumber - START_BLOCK) * REWARD_PER_DAY / totalStaked;
        }



        return amount;
    }

    // mint the maximum supply of 100,000 tokens over 1 year
    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 100000 * 10 ** DECIMALS;
    uint8 public constant DECIMALS = 18;

    uint256 public constant MAX_TIME = 365 days;
    // ? 365 days = blocks?
    // ? 365 days = 365 * 24 * 60 * 60 = 31536000 seconds
    // ? 31536000 seconds = 31536000 / 15 = 2102400 blocks
    // ? 2102400 blocks = 2102400 / 5760 = 365 days
    // ? 5760 blocks = 5760 * 15 = 86400 seconds = 1 day
    uint256 public constant START_BLOCK = 0;
    uint256 public constant END_BLOCK = START_BLOCK + MAX_TIME;
    uint256 public constant REWARDS_PER_BLOCK = MAX_SUPPLY / MAX_TIME;
    uint256 public constant BLOCKS_PER_DAY = 5760;
    uint256 public constant REWARD_PER_DAY = MAX_SUPPLY / MAX_TIME * BLOCKS_PER_DAY;

    function mint() external {
        // mint the maximum supply of 100,000 tokens over 1 year
        // calculate the reward amount based on the amount of time the account has staked
        // and the amount of tokens staked
        uint256 blockNumber = block.number;
        if (blockNumber < START_BLOCK) {
            totalSupply = 0;
        } else if (blockNumber >= END_BLOCK) {
            totalSupply = MAX_SUPPLY;
        } else {
            totalSupply = (blockNumber - START_BLOCK) * REWARD_PER_DAY;
        }

    }


}