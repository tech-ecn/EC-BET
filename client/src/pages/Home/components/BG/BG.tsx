import React, { useState } from 'react'
import Container from 'typedi'
import { API } from '../../../../API'
import { player } from '../../../../assets'
import { BetAddress } from '../../../../config'
import { useAppSelector } from '../../../../redux/hooks'
import { ContractsInstance } from '../../../../utilities/getContractInstance'
import { bignum } from '../../Home'

import './BG.scss'

export const BG = () => {
	const [data, setData] = useState({
		bet_amount: '',
		bet_counter: '',
		bet_instance_counter: '',
		bet_name: '',
		end: '',
	})
	const bet_uid = useAppSelector((state) => state.userDataReducer.bet_uid)
	React.useEffect(() => {
		const run = async (bet_uid: string) => {
			const bet_data = await API.bet_details(bet_uid)

			setData(bet_data)
		}
		if (bet_uid) {
			run(bet_uid)
		}
	}, [bet_uid])

	const primary = useAppSelector((state) => state.userDataReducer.primary)
	const contracts_loaded = useAppSelector((state) => state.userDataReducer.contracts_loaded)

	const handleBetAgainst = async (amount: string, counter: string) => {
		const data = {
			budget: amount,
			match: counter,
		}
		if (primary && contracts_loaded) {
			const contracts = Container.get(ContractsInstance)
			const bet = contracts.get_bet()
			const token = contracts.get_token()

			const wei = new bignum(data.budget).multipliedBy(Math.pow(10, 18))
			await token.methods.approve(BetAddress, wei).send({
				from: primary,
			})
			bet.methods
				.allowBetAgainst(data.match)
				.estimateGas({
					from: primary,
				})
				.then((data) => {
					console.log(data)
				})
				.catch((err) => {
					console.error(err)
					alert(err)
				})
			try {
				let tx = bet.methods.allowBetAgainst(data.match).send({
					from: primary,
				})

				// .catch((err) => {
				// 	alert(err)
				// })

				tx.on('error', (err) => {
					const { message, name } = err
					console.error({ message, name })
					alert(err.message)
				})

				tx.on('transactionHash', function (hash: any) {
					console.log(`Transaction hash is ${hash}`)
					alert(`Transaction sent. Waiting for confirmation ..`)
				}).once('confirmation', function (confirmationNumber: any, receipt: { transactionHash: any }) {
					console.log(receipt)

					// const bet_instance_counter = (receipt as any)?.events?.BetInstanceCounterUpdate?.returnValues?.bet_instance_counter

					const transactionHash = receipt.transactionHash
					console.log(transactionHash)
					// alert(bet_instance_counter)
					// setBetState((state) => ({
					// 	...state,
					// 	bet_counter,
					// 	tx: transactionHash,
					// 	start,
					// 	end,
					// }))
					// const request_data = {
					// 	tx: transactionHash,
					// 	bet_amount: wei,
					// 	uid: uid,
					// 	bet_counter: data.match,
					// 	bet_instance_counter,
					// }
					// setTimeout(() => {
					// 	console.log(betState)
					// 	updateAPI({
					// 		...betState,
					// 		bet_counter,
					// 		tx: transactionHash,
					// 		start,
					// 		end,
					// 	})
					// }, 500)
				})
			} catch (error) {
				console.error(error)
			}
		}
	}
	return (
		<div className='bg'>
			<div className='outer'>
				<div className='containers left'>
					<span className='bold'>{data.bet_name}</span>
					{/* {bet_uid ?? ''} */}
					<div className='wrapper'>
						<div
							onClick={() =>
								handleBetAgainst(
									new bignum(data.bet_amount).dividedToIntegerBy(Math.pow(10, 18)).toString(),
									data.bet_instance_counter
								)
							}
							className='bttn'
						>
							BET: {new bignum(data.bet_amount).dividedToIntegerBy(Math.pow(10, 18)).toString()} ECN
						</div>
						<div className='expires'>Expires: {data.end}</div>
						<div className='live'>LIVE</div>
					</div>
				</div>
				<div className='containers right'>
					<div className='img'>
						<img src={player} alt='' />
					</div>
				</div>
			</div>
		</div>
	)
}
