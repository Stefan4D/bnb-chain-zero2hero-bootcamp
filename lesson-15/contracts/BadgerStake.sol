// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// import "./IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract BadgerStake {
    IERC20 private _token;
    mapping(address => uint256) private _balances;

    constructor(IERC20 token) {
        _token = token;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(_token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        _balances[msg.sender] += amount;
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        require(_token.transfer(msg.sender, amount), "Transfer failed");
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }
}
