import React from 'react'
import Container from 'typedi'
import { BetABI, BetAddress, MigrationsABI, MigrationsAddress, TokenABI, TokenAddress } from '../config'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { UserDataActions } from '../redux/slices/UserData'
import { Bet } from '../types/Bet'
import { ERC20 } from '../types/ERC20'
import { Migrations } from '../types/Migrations'
import { ContractsInstance } from '../utilities/getContractInstance'
import { getWeb3 } from '../utilities/getWeb3'

const contracts = Container.get(ContractsInstance)

export const LoadContractsHook = ({ setLoaded }: { setLoaded: CallableFunction }) => {
	const [updates, setUpdates] = React.useState(true)

	const isOwner = useAppSelector((state) => state.userDataReducer.isOwner)
	const primaryAccount = useAppSelector((state) => state.userDataReducer.primary)
	const dispatch = useAppDispatch()

	const updateUserData = React.useCallback(
		async (MigrationsInstance: Migrations) => {
			if ((await MigrationsInstance.methods.owner().call()) === primaryAccount) {
				dispatch(UserDataActions.setIsOwner(true))
			}
		},
		[primaryAccount, dispatch]
	)

	const load = React.useCallback(async () => {
		if (primaryAccount && updates) {
			// const normalWeb3 = await getWeb3({ biconomy: false })
			const web3 = await getWeb3({ biconomy: false })
			// const biconomy =
			;(window as any).b_ = web3
			const MigrationsInstance = (new web3.eth.Contract(MigrationsABI as any, MigrationsAddress) as unknown) as Migrations

			const Token = (new web3.eth.Contract(TokenABI as any, TokenAddress) as unknown) as ERC20
			;(window as any).normal = Token
			const Bet = (new web3.eth.Contract(BetABI as any, BetAddress) as unknown) as Bet

			contracts.set_migration(MigrationsInstance)
			contracts.set_bet(Bet)
			contracts.set_token(Token)
			await updateUserData(MigrationsInstance)
			;(window as any).contracts = contracts

			setLoaded(true)
			dispatch(UserDataActions.setContractsLoaded(true))
		}
	}, [primaryAccount, updates, updateUserData, setLoaded, dispatch])

	React.useEffect(() => {
		load()
	}, [load])

	return {
		isOwner,
		updates,
		setUpdates,
	}
}
