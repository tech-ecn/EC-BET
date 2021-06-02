// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import './3_ERC20.sol';

library Lib {
	enum BetStatus {AboutToOpen, OpenForBetting, ClosedForBetting, ResultsDeclared}
	enum Winner {NotDecalred, Tied, BettorA, BettorB}
}

// TODO: make ownable
contract Bet is BaseRelayRecipient {
	modifier onlyWallet() {
		require(wallet == _msgSender(), 'Only Wallet.');
		_;
	}

	function declareResult(uint256 _counter, Lib.Winner winner) external onlyWallet() {
		require(bets[_counter].exists == true, 'No such bet.');
		require(block.timestamp > bets[_counter].endTime, 'Bet yet to end.');

		bets[_counter].status = Lib.BetStatus.ResultsDeclared;

		bets[_counter].winner = winner;
	}

	function withdraw(uint256 _bet_instance_counter) external {
		require(bets_instances[_bet_instance_counter].exists == true, 'No such bet.');
		require(bets_instances[_bet_instance_counter].withdrawn == false, 'Already withdrawn');
		uint256 _counter = bets_instances[_bet_instance_counter].bet_counter;
		require(bets[_counter].status == Lib.BetStatus.ResultsDeclared);

		if (
			(bets[_counter].winner == Lib.Winner.BettorA && bets_instances[_bet_instance_counter].bettorA == _msgSender()) ||
			(bets[_counter].winner == Lib.Winner.BettorB && bets_instances[_bet_instance_counter].bettorB == _msgSender())
		) {
			if (bets_instances[_bet_instance_counter].bettorB != address(0))
				Token.transfer(_msgSender(), 2 * (bets_instances[_bet_instance_counter].bet_amount - bets_instances[_bet_instance_counter].fees));
			else {
				Token.transfer(_msgSender(), (bets_instances[_bet_instance_counter].bet_amount - bets_instances[_bet_instance_counter].fees));
			}
		}
		bets_instances[_bet_instance_counter].withdrawn = true;
	}

	uint256 public percentFeesTimes100;
	ERC20 Token;
	address public wallet;

	constructor(
		uint256 _percentFeesTimes100,
		address _Token,
		address _owner_wallet,
		address _trustedForwarder
	) {
		percentFeesTimes100 = _percentFeesTimes100;
		Token = ERC20(_Token);

		wallet = _owner_wallet;
		trustedForwarder = _trustedForwarder;
	}

	uint256 public bet_counter;

	uint256 public bet_instance_counter;

	event BetCounterUpdate(uint256 bet_counter);
	event BetInstanceCounterUpdate(uint256 bet_instance_counter);

	function getUserBetCount() public view returns (uint256 length) {
		return UserBets[_msgSender()].length;
	}

	mapping(address => uint256[]) public UserBets;

	function getBetCounter() internal returns (uint256) {
		bet_counter += 1;
		emit BetCounterUpdate(bet_counter);
		return bet_counter;
	}

	function getBetInstanceCounter() internal returns (uint256) {
		bet_instance_counter += 1;
		emit BetInstanceCounterUpdate(bet_instance_counter);
		return bet_instance_counter;
	}

	struct BetInstanceData {
		address bettorA;
		address bettorB;
		bool exists;
		bool withdrawn;
		uint256 bet_counter;
		uint256 bet_amount;
		uint256 fees;
	}

	struct BetData {
		uint256 startTime;
		uint256 endTime;
		Lib.BetStatus status;
		bool exists;
		Lib.Winner winner;
		uint256 percentFeesTimes100;
	}

	mapping(uint256 => BetData) public bets;

	mapping(uint256 => BetInstanceData) public bets_instances;

	function updateFees(uint256 _percentFeesTimes100) external onlyWallet {
		percentFeesTimes100 = _percentFeesTimes100;
	}

	function createBet(uint256 startTime, uint256 endTime) public onlyWallet returns (uint256) {
		require(endTime > block.timestamp, 'Date of Result > current Time.');

		uint256 _counter = getBetCounter();

		bets[_counter] = BetData(startTime, endTime, Lib.BetStatus.AboutToOpen, true, Lib.Winner.NotDecalred, percentFeesTimes100);

		return _counter;
	}

	function allowBet(uint256 _bet_counter, uint256 bet_amount) public {
		require(bets[_bet_counter].exists == true, 'No such bet.');
		require(block.timestamp > bets[_bet_counter].startTime, 'Bet not started.');
		require(block.timestamp < bets[_bet_counter].endTime, 'Bet has already ended.');

		uint256 fees = (bet_amount * percentFeesTimes100) / 10000;

		Token.transferFrom(_msgSender(), address(this), bet_amount - fees);
		Token.transferFrom(_msgSender(), wallet, fees);

		uint256 _bet_instance_counter = getBetInstanceCounter();

		BetInstanceData memory b;

		UserBets[_msgSender()].push(_bet_instance_counter);

		b.exists = true;
		b.bettorA = _msgSender();
		b.bet_amount = bet_amount;
		b.bet_counter = _bet_counter;

		b.fees = fees;

		bets_instances[_bet_instance_counter] = b;
	}

	function allowBetAgainst(uint256 _bet_instance_counter) public {
		require(bets_instances[_bet_instance_counter].exists == true, 'No such bet.');
		uint256 _bet_counter = bets_instances[_bet_instance_counter].bet_counter;

		require(block.timestamp > bets[_bet_counter].startTime, 'Bet not started.');
		require(block.timestamp < bets[_bet_counter].endTime, 'Bet has already ended.');

		require(bets_instances[_bet_instance_counter].bettorB == address(0), 'Bettor exists.');

		Token.transferFrom(_msgSender(), address(this), bets_instances[_bet_counter].bet_amount);
		Token.transfer(wallet, bets_instances[_bet_counter].fees);

		bets[_bet_counter].status = Lib.BetStatus.OpenForBetting;

		UserBets[_msgSender()].push(_bet_instance_counter);

		bets_instances[_bet_instance_counter].bettorB = _msgSender();
	}

	// function allowBettorB(uint256 _counter) public {
	// 	require(bets[_counter].exists == true, 'No such bet.');

	// 	BetData memory bet = bets[_counter];
	// 	require(bet.status == Lib.BetStatus.OpenForBetting, 'Not open fo betting.');
	// 	require(_msgSender() != bet.bettorA, 'Cannot bet against yourself.');
	// 	require(block.timestamp < bet.endTime, 'Bet has already ended.');

	// 	Token.transferFrom(_msgSender(), address(this), bet.bet_amount);
	// 	bets[_counter].status = Lib.BetStatus.ClosedForBetting;
	// 	bets[_counter].bettorB = _msgSender();
	// 	UserBets[_msgSender()].push(_counter);
	// }

	function versionRecipient() external pure override returns (string memory) {
		return '1';
	}
}

// contract BettingFactory is Ownable {
// 	// address[] public bets;
// 	// ERC20 Token;
// 	// constructor(address _token) {
// 	// 	Token = ERC20(_token);
// 	// }
// 	// function createBet(uint256 bet_amount, uint256 endTime) public returns (uint256) {
// 	// 	endTime;
// 	// 	Bet b = new Bet(owner(), _msgSender(), bet_amount, endTime, address(Token));
// 	// 	Token.transferFrom(_msgSender(), address(b), bet_amount);
// 	// 	bets.push(address(b));
// 	// 	return bets.length - 1;
// 	// }
// }
