// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

contract DogCoin {

    uint256 totalSupply = 2000000;
    address owner;
    mapping (address => uint256) balances;
    struct Payment {
        uint256 amount;
        address recipient;
    }
    mapping (address => Payment[]) payments;

    modifier onlyOwner {
        require(msg.sender == owner, 'You are not the contract owner');
        _;
    }

    function getBalance(address _address) public view returns(uint256) {
        return balances[_address];
    }

    // Do not need the sender's address in the function signature as this is accessable through msg.sender
    // If we added the sender's address as a parameter then it would allow other users to transfer tokens on behalf of another address
    function transfer(uint256 _amount, address _recipient) public {
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;
        payments[msg.sender].push(Payment({ amount: _amount, recipient: _recipient }));
        emit tokenTransfer(_amount, _recipient);
    }

    function getTotalSupply() public view returns(uint256) {
        return totalSupply;
    }

    function getPayments(address _address) public view returns(Payment[] memory) {
        return payments[_address];
    }

    function increaseTotalSupply() public onlyOwner {
        totalSupply += 1000;
        emit totalSupplyChanged(totalSupply, "Total supply increased");
    }

    event totalSupplyChanged(uint256 newSupply, string eventMessage);
    event tokenTransfer(uint256 _amount, address _recipient);

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }
}