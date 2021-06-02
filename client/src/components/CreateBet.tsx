import React, { useState } from 'react'
import Container from 'typedi'
import { API } from '../API'
import { useAppSelector } from '../redux/hooks'
import { LoadContracts } from '../Routes'
import { ContractsInstance } from '../utilities/getContractInstance'

export const CreateBet: React.FC = () => {
	const primary = useAppSelector((state) => state.userDataReducer.primary)

	const [betState, setBetState] = useState({
		bet_counter: '',
		tx: '',
		start: 0,
		end: 0,
		betName: 'CSV vs Chennai',
	})

	const updateAPI = async (betState: { bet_counter: string; tx: string; start: number; end: number; betName: string }) => {
		const uid = localStorage.getItem('uid')
		const token = localStorage.getItem('token')

		if (uid && token) {
			const request_data = {
				body: { uid, ...betState },
				token,
			}

			console.log(request_data)
			const resp = await API.create_a_bet(request_data)
			console.log(resp)
		}
	}

	const createBet = async () => {
		const uid = localStorage.getItem('uid')
		const token = localStorage.getItem('token')
		if (!(uid && token)) {
			alert('Not logged in.')
			return
		}
		try {
			const contracts = Container.get(ContractsInstance)
			// let token = contracts.get_token()

			let bet = contracts.get_bet()

			const start = Math.floor(Date.now() / 1000) + 10
			const end = Math.floor(Date.now() / 1000) + 3600

			let tx = bet.methods.createBet(start, end).send({
				from: primary,
			} as any)

			tx.on('transactionHash', function (hash: any) {
				console.log(`Transaction hash is ${hash}`)
				alert(`Transaction sent. Waiting for confirmation ..`)
			}).once('confirmation', function (confirmationNumber: any, receipt: { transactionHash: any }) {
				console.log(receipt)

				const bet_counter = (receipt as any)?.events?.BetCounterUpdate?.returnValues?.bet_counter

				const transactionHash = receipt.transactionHash
				setBetState((state) => ({
					...state,
					bet_counter,
					tx: transactionHash,
					start,
					end,
				}))

				console.log(betState)
				updateAPI({
					...betState,
					bet_counter,
					tx: transactionHash,
					start,
					end,
				})

				alert('Ok')
			})
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<LoadContracts>
			<div>
				{Object.keys(betState).map((elem) => (
					<p>
						{elem} : {(betState as any)[elem]}
					</p>
				))}

				<input
					type='text'
					value={betState.betName}
					onChange={(e) => {
						setBetState((state) => ({ ...state, betName: e.target.value }))
					}}
				/>
				<button onClick={() => createBet()}>Create a Bet</button>
				<br />
			</div>
		</LoadContracts>
	)
}
