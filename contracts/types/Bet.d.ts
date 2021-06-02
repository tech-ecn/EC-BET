/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { BigNumber } from 'bignumber.js'

export interface BetContract extends Truffle.Contract<BetInstance> {
	'new'(
		_percentFeesTimes100: number | BigNumber | string,
		_Token: string | BigNumber,
		_owner_wallet: string | BigNumber,
		_trustedForwarder: string | BigNumber,
		meta?: Truffle.TransactionDetails
	): Promise<BetInstance>
}

export interface BetCounterUpdate {
	name: 'BetCounterUpdate'
	args: {
		bet_counter: BigNumber
	}
}

export interface BetInstanceCounterUpdate {
	name: 'BetInstanceCounterUpdate'
	args: {
		bet_instance_counter: BigNumber
	}
}

type AllEvents = BetCounterUpdate | BetInstanceCounterUpdate

export interface BetInstance extends Truffle.ContractInstance {
	UserBets(arg0: string | BigNumber, arg1: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<BigNumber>

	bet_counter(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>

	bet_instance_counter(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>

	bets(
		arg0: number | BigNumber | string,
		txDetails?: Truffle.TransactionDetails
	): Promise<[BigNumber, BigNumber, BigNumber, boolean, BigNumber, BigNumber]>

	bets_instances(
		arg0: number | BigNumber | string,
		txDetails?: Truffle.TransactionDetails
	): Promise<[string, string, boolean, BigNumber, BigNumber]>

	/**
	 * return if the forwarder is trusted to forward relayed transactions to us. the forwarder is required to verify the sender's signature, and verify the call is not a replay.
	 */
	isTrustedForwarder(forwarder: string | BigNumber, txDetails?: Truffle.TransactionDetails): Promise<boolean>

	percentFeesTimes100(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>

	trustedForwarder(txDetails?: Truffle.TransactionDetails): Promise<string>

	wallet(txDetails?: Truffle.TransactionDetails): Promise<string>

	declareResult: {
		(_counter: number | BigNumber | string, winner: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<
			Truffle.TransactionResponse<AllEvents>
		>
		call(_counter: number | BigNumber | string, winner: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<void>
		sendTransaction(
			_counter: number | BigNumber | string,
			winner: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<string>
		estimateGas(
			_counter: number | BigNumber | string,
			winner: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<number>
	}

	withdraw: {
		(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>
		call(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<void>
		sendTransaction(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<string>
		estimateGas(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<number>
	}

	getUserBetCount(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>

	updateFees: {
		(_percentFeesTimes100: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>
		call(_percentFeesTimes100: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<void>
		sendTransaction(_percentFeesTimes100: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<string>
		estimateGas(_percentFeesTimes100: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<number>
	}

	createBet: {
		(startTime: number | BigNumber | string, endTime: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<
			Truffle.TransactionResponse<AllEvents>
		>
		call(startTime: number | BigNumber | string, endTime: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<BigNumber>
		sendTransaction(
			startTime: number | BigNumber | string,
			endTime: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<string>
		estimateGas(
			startTime: number | BigNumber | string,
			endTime: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<number>
	}

	allowBet: {
		(_bet_counter: number | BigNumber | string, bet_amount: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<
			Truffle.TransactionResponse<AllEvents>
		>
		call(
			_bet_counter: number | BigNumber | string,
			bet_amount: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<void>
		sendTransaction(
			_bet_counter: number | BigNumber | string,
			bet_amount: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<string>
		estimateGas(
			_bet_counter: number | BigNumber | string,
			bet_amount: number | BigNumber | string,
			txDetails?: Truffle.TransactionDetails
		): Promise<number>
	}

	allowBetAgainst: {
		(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>
		call(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<void>
		sendTransaction(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<string>
		estimateGas(_bet_instance_counter: number | BigNumber | string, txDetails?: Truffle.TransactionDetails): Promise<number>
	}

	/**
	 * return the sender of this call. if the call came through our trusted forwarder, then the real sender is appended as the last 20 bytes of the msg.data. otherwise, return `msg.sender` should be used in the contract anywhere instead of msg.sender
	 */
	versionRecipient(txDetails?: Truffle.TransactionDetails): Promise<string>
}
