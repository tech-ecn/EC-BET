import { Fragment, useState } from 'react'
import Container from 'typedi'
import { useAppSelector } from '../redux/hooks'
import { ContractsInstance } from '../utilities/getContractInstance'

export const DeclareResult: React.FC = () => {
	const primary = useAppSelector((state) => state.userDataReducer.primary)
	const contracts_loaded = useAppSelector((state) => state.userDataReducer.contracts_loaded)

	const [_counter, setCounter] = useState('0')
	const [_winner, setWinner] = useState<'1' | '2' | '3'>('1')

	const declareResult = async () => {
		if (!primary && !contracts_loaded) {
			return
		}
		try {
			const contracts = Container.get(ContractsInstance)
			// let token = contracts.get_token()

			let bet = contracts.get_bet()
			// await contracts.get_token().methods.increaseAllowance(BetAddress, 200).send({
			// 	from: primary,
			// })

			let tx = bet.methods.declareResult(_counter, _winner).send({
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
		<Fragment>
			<input
				type='text'
				name=''
				onChange={(e) => {
					setCounter(e.target.value)
				}}
				id=''
			/>
			<input
				type='text'
				name=''
				value={_winner}
				onChange={(e) => {
					if (e.target.value === '1' || e.target.value === '2' || e.target.value === '3') {
						setWinner(e.target.value)
					}
				}}
				id=''
			/>
			<input type='button' value='Declare Result' onClick={() => declareResult()} />
		</Fragment>
	)
}
