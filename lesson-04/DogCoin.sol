// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

contract DogCoin {

    uint256 totalSupply = 2000000;
    address owner;
    mapping (address => uint256) balances;

    modifier onlyOwner {
        require(msg.sender == owner, 'You are not the contract owner');
        _;
    }

    function getBalance(address _address) public view returns(uint256) {
        return balances[_address];
    }

    function getTotalSupply() public view returns(uint256) {
        return totalSupply;
    }

    function increaseTotalSupply() public onlyOwner {
        totalSupply += 1000;
        emit totalSupplyChanged(totalSupply, "Total supply increased");
    }

    event totalSupplyChanged(uint256 newSupply, string eventMessage);

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }
}