// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.8 < 0.9;

contract Text {
    string public text;

    constructor () {
        text = "Hello";
    }

    function changeText(string memory newText) public {
        text = newText;
    }
}
