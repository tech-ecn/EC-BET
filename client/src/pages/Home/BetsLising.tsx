import React, { Fragment, useEffect, useState } from 'react'
import { WTC } from './components/WalletTransactions/WalletTransactions'
import { API } from '../../API'
import Container from 'typedi'
import { ContractsInstance } from '../../utilities/getContractInstance'
import { useAppSelector } from '../../redux/hooks'
import { BetAddress } from '../../config'
import { bignum } from './Home'

export const BetsLising = () => {
	const [bets, setBets] = useState([
		{
			eths: '0.2312',
			bet_amount: '2313',
			tx: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
			bet_instance_counter: '0',
			winner: '0',
			bettor_b: '',
		},
	])

	const [selected, setSelected] = useState<'OPEN BETS' | 'MY BETS' | 'RESULTS'>('OPEN BETS')
	const update = useAppSelector((state) => state.userDataReducer.update)

	const primary = useAppSelector((state) => state.userDataReducer.primary)
	const contracts_loaded = useAppSelector((state) => state.userDataReducer.contracts_loaded)

	// eslint-disable-next-line
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
				.catch((err) => console.error(err))

			let tx = bet.methods.allowBet(data.match, wei).send({
				from: primary,
			})
			tx.on('transactionHash', function (hash: any) {
				console.log(`Transaction hash is ${hash}`)
				alert(`Transaction sent. Waiting for confirmation ..`)
			}).once('confirmation', function (confirmationNumber: any, receipt: { transactionHash: any }) {
				console.log(receipt)

				const bet_instance_counter = (receipt as any)?.events?.BetInstanceCounterUpdate?.returnValues?.bet_instance_counter

				const transactionHash = receipt.transactionHash
				console.log(bet_instance_counter, transactionHash)
				alert(bet_instance_counter)
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
		}
	}

	const withdraw = async (instance_counter: any) => {
		if (primary && contracts_loaded) {
			const contracts = Container.get(ContractsInstance)
			const bet = contracts.get_bet()
			await bet.methods.withdraw(instance_counter).send({ from: primary })
			alert('Withdrawn')
		}
	}

	useEffect(() => {
		if (selected === 'OPEN BETS')
			API.open_bets()
				.then((data) => {
					setBets(data)
				})
				.catch((err) => {
					console.error(err)
				})
		else if (selected === 'MY BETS') {
			API.my_bets(localStorage.getItem('uid') ?? '')
				.then(async (data) => {
					setBets(data)
					setBets(
						await Promise.all(
							data.map(async (elem: any) => {
								const bet = Container.get(ContractsInstance).get_bet()
								return { ...elem, winner: (await bet.methods.bets(elem.bet_counter).call()).winner }
							})
						)
					)
				})
				.catch((err) => {
					console.error(err)
				})
		} else {
			API.open_bets()
				.then(async (data) => {
					setBets(data)
					setBets(
						await Promise.all(
							data.map(async (elem: any) => {
								const bet = Container.get(ContractsInstance).get_bet()
								return { ...elem, winner: (await bet.methods.bets(elem.bet_counter).call()).winner }
							})
						)
					)
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}, [update, selected])
	return (
		<div className='BetsDisplayed'>
			<div className='outer'>
				<div onClick={() => setSelected('OPEN BETS')} className={selected === 'OPEN BETS' ? `common bttn` : 'common plain'}>
					OPEN BETS
				</div>
				<div onClick={() => setSelected('MY BETS')} className={selected === 'MY BETS' ? `common bttn` : 'common plain'}>
					MY BETS
				</div>
				<div onClick={() => setSelected('RESULTS')} className={selected === 'RESULTS' ? `common bttn` : 'common plain'}>
					RESULTS
				</div>
			</div>
			<div className='card'>
				<div className='inner'>
					{bets.map((elem) => (
						<span
							onClick={() => {
								console.log(elem)
								withdraw(elem.bet_instance_counter)
								// handleBetAgainst(elem.bet_amount, elem.bet_instance_counter)
							}}
						>
							{selected === 'RESULTS' && (
								<Fragment>
									{elem.winner
										? `Winner:${
												elem.winner === '2' || elem.winner === '3' ? (elem.winner === '2' ? 'Bettor A' : 'Bettor B') : ''
										  }`
										: ''}
									<span style={{ padding: '0.5rem 1rem' }} className='bttn' onClick={() => withdraw(elem.bet_instance_counter)}>
										Withdraw
									</span>
								</Fragment>
							)}
							<WTC
								eth={`${new bignum(elem.bet_amount).dividedToIntegerBy(Math.pow(10, 18)).toString()} ECN`}
								ecn={`${new bignum(elem.bet_amount).dividedToIntegerBy(Math.pow(10, 18)).toString()} ECN`}
								id={elem.tx}
								winner={elem.winner}
								tag={elem?.bettor_b ? 'CLOSED' : 'OPEN'}
								type={0}
							/>
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
