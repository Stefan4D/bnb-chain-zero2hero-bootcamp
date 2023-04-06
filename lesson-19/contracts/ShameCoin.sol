// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShameCoin is ERC20, Ownable {
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    constructor() ERC20("ShameCoin", "SHAME") {}

    /// @notice Mint new tokens
    /// @dev Only owner can mint new tokens
    /// @param to The address that will receive the minted tokens
    /// @param amount The amount of tokens to mint
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice Return number of decimals
    /// @dev Overriding decimals function from ERC20
    /// @return uint8 Number of decimals
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    /// @notice Transfer tokens to a specified address but only the owner can transfer
    /// @dev Overriding transfer function from ERC20
    /// @param recipient The address to transfer to
    /// @param amount The amount to be transferred
    /// @return bool Whether the transfer was successful or not
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(balanceOf(_msgSender()) >= amount, "ShameCoin: transfer amount exceeds balance");
        require(amount == 1, "ShameCoin: transfer amount must be 1");
        if(msg.sender == owner()) {
            _transfer(_msgSender(), recipient, amount);
        } else {
            _mint(_msgSender(), amount);
        }
        return true;
    }

    /// @notice Transfer tokens from one address to another but only the owner can transfer
    /// @dev Overriding transferFrom function from ERC20
    /// @param sender The address to transfer from
    /// @param amount The amount to be transferred
    /// @return bool Whether the transfer was successful or not
    function transferFrom(address sender, uint256 amount) public virtual onlyOwner returns (bool) {
        require(balanceOf(sender) >= amount, "ShameCoin: transfer amount exceeds balance");
        require(amount == 1, "ShameCoin: transfer amount must be 1");
        _burn(sender, amount);
        return true;
    }

    /// @notice Burn tokens
    /// @dev Overriding burn function from ERC20
    /// @param account The address to burn from
    /// @param amount The amount to be burned
    function _burn(address account, uint256 amount) internal virtual override {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

}