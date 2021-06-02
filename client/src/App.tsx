import React from 'react'

import './App.scss'
import { MetaMaskHook } from './hooks/MetaMaskHook'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { UserDataActions } from './redux/slices/UserData'
// import { MetaMaskHook } from './hooks/MetaMaskHook'
// import { useAppDispatch, useAppSelector } from './redux/hooks'
// import { UserDataActions } from './redux/slices/UserData'
// import { getAccounts } from './utilities/getWeb3'
import {
	// LoadContracts,
	Routes,
} from './Routes'

function App() {
	const { accounts } = MetaMaskHook()

	const primaryAccount = useAppSelector((state) => state.userDataReducer.primary)
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		if (accounts[0]) {
			dispatch(UserDataActions.setPrimaryAccount(accounts[0]))
		}
	}, [accounts, dispatch])

	React.useEffect(() => {
		if (primaryAccount) {
			console.log(primaryAccount)
		}
	}, [primaryAccount])

	return (
		<>
			<div className='App'>
				<Routes></Routes>
			</div>
		</>
	)
}

export default App
