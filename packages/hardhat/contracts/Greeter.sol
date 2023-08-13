//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Greeter {
    event newGreeting(string greeting, address sender);

    string private greeting;

    constructor(string memory _greet) {
        greeting = _greet;
    }

    function greet() external view returns (string memory) {
        return greeting;
    }

    function setGreeting(string calldata _greeting) external {
        greeting = _greeting;
        emit newGreeting(_greeting, msg.sender);
    }
}
