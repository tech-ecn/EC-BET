import React from 'react'
import Container from 'typedi'
// import { BetAddress } from '../config'
import { useAppSelector } from '../redux/hooks'
import { ContractsInstance } from '../utilities/getContractInstance'

export const PlaceBet: React.FC = () => {
	const primary = useAppSelector((state) => state.userDataReducer.primary)

	const createBet = async () => {
		try {
			const contracts = Container.get(ContractsInstance)
			// let token = contracts.get_token()

			let bet = contracts.get_bet()
			// await contracts.get_token().methods.increaseAllowance(BetAddress, 200).send({
			// 	from: primary,
			// })

			let tx = bet.methods.allowBetAgainst(1).send({
				from: primary,
			})

			tx.on('transactionHash', function (hash: any) {
				console.log(`Transaction hash is ${hash}`)
				alert(`Transaction sent. Waiting for confirmation ..`)
			}).once('confirmation', function (confirmationNumber: any, receipt: { transactionHash: any }) {
				console.log(receipt)
				console.log(receipt.transactionHash)
				alert('Ok')
			})
		} catch (err) {
			// console.error(err)
		}
	}
	return (
		<div>
			<button onClick={() => createBet()}>Place Bet</button>
		</div>
	)
}
