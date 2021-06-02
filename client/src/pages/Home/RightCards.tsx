import React from 'react'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import Container from 'typedi'
import { API } from '../../API'
import { token, token_heap, wallet } from '../../assets'
import { MetaMaskHook } from '../../hooks/MetaMaskHook'
import { useAppSelector } from '../../redux/hooks'
import { UserDataActions } from '../../redux/slices/UserData'
import { LoadContracts } from '../../Routes'
import { ContractsInstance } from '../../utilities/getContractInstance'
import { getAccounts } from '../../utilities/getWeb3'
import './RightCards.scss'

const bignum = (window as any).BigNumber

export const RightCards = () => {
	const [state, setState] = useState({
		balance: '0',
		bets: 0,
		amount: 0,
	})
	const { setAccounts } = MetaMaskHook()
	const primaryAccount = useAppSelector((state) => state.userDataReducer.primary)
	const contracts_loaded = useAppSelector((state) => state.userDataReducer.contracts_loaded)

	const connectWallet = async () => {
		setAccounts(await getAccounts({ biconomy: false }))
	}

	React.useEffect(() => {
		if (primaryAccount && contracts_loaded) {
			Container.get(ContractsInstance)
				.get_token()
				.methods.balanceOf(primaryAccount)
				.call()
				.then((data) => {
					setState((state) => ({
						...state,
						balance: new bignum(data.toString()).dividedToIntegerBy(Math.pow(10, 18)).toString(),
					}))
				})
		}
	}, [primaryAccount, contracts_loaded])

	const update = useAppSelector((state) => state.userDataReducer.update)
	React.useEffect(() => {
		API.my_bets(localStorage.getItem('uid') ?? '')
			.then((data) => {
				setState((state) => ({
					...state,
					bets: data?.length ?? 0,
					amount: data?.reduce(
						(a: number, b: any) => a + parseInt(new bignum(b.bet_amount).dividedToIntegerBy(Math.pow(10, 18)).toString()),
						0
					),
				}))
			})
			.catch((err) => {
				console.error(err)
			})
	}, [update])

	const dispatch = useDispatch()

	return (
		<Fragment>
			<LoadContracts></LoadContracts>
			<div className='RightCard WalletBalance'>
				<div
					className='card'
					onClick={() => {
						if (!primaryAccount) {
							connectWallet()
						}
						dispatch(UserDataActions.setOption('transactions'))
					}}
				>
					<div className='inner'>
						<div className='outer'>
							<div className='bal'>
								<div className='num'>{state.balance}</div>
								<div className='text'>Wallet Balance</div>
							</div>
							<div className='img'>
								<img src={wallet} alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='RightCard'>
				<div className='card' onClick={() => dispatch(UserDataActions.setOption('listing'))}>
					<div className='inner'>
						<div className='outer'>
							<div className='bal'>
								<div className='num'>{state.bets}</div>
								<div className='text'>Total Bets Created</div>
							</div>
							<div className='img'>
								<img src={token} alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='RightCard'>
				<div className='card'>
					<div className='inner'>
						<div className='outer'>
							<div className='bal'>
								<div className='num'>{state.amount}</div>
								<div className='text'>Tokens Transferred</div>
							</div>
							<div className='img'>
								<img src={token_heap} alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
