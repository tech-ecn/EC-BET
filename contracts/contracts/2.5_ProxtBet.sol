// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import '@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ProxyBet is ERC1967Proxy, Ownable {
	constructor(address _logic, bytes memory _data) ERC1967Proxy(_logic, _data) {}

	function implementation() external view returns (address) {
		return _implementation();
	}

	function upgradeTo(address _logic, bytes memory _data) public onlyOwner {
		_upgradeTo(_logic);
		if (_data.length > 0) {
			Address.functionDelegateCall(_logic, _data);
		}
	}
}
