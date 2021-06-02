// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

import './3_ERC20.sol';

contract Migrations {
	address public owner = msg.sender;
	uint256 public last_completed_migration;

	modifier restricted() {
		require(msg.sender == owner, "This function is restricted to the contract's owner");
		_;
	}

	function setCompleted(uint256 completed) public restricted {
		last_completed_migration = completed;
	}
}

contract TestToken is ERC20 {
	constructor(address trustedForwarder_) ERC20('Test', 'TST', trustedForwarder_) {
		_mint(msg.sender, 100000 ether);
		approve(msg.sender, 100000 ether);
		increaseAllowance(msg.sender, 100000 ether);
	}

	function mint() public {
		_mint(msg.sender, 100000 ether);
	}
}
