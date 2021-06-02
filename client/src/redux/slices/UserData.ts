import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserData {
	primary: string
	isOwner: boolean
	contracts_loaded: boolean
	update: number
	option: 'listing' | 'wallet' | 'transactions'
	bet_uid: string | null
}

const initialState: UserData = {
	primary: '',
	isOwner: false,
	contracts_loaded: false,
	update: 0,
	option: 'transactions',
	bet_uid: null,
}

export const slice = createSlice({
	name: 'primary',
	initialState,
	reducers: {
		setIsOwner(state, action: PayloadAction<boolean>) {
			state.isOwner = action.payload
		},
		setPrimaryAccount(state, action: PayloadAction<string>) {
			state.primary = action.payload
		},
		setContractsLoaded(state, action: PayloadAction<boolean>) {
			state.contracts_loaded = action.payload
		},
		setUpdate(state) {
			state.update = state.update + 1
		},
		setOption(state, action: PayloadAction<'listing' | 'wallet' | 'transactions'>) {
			state.option = action.payload
		},
		setBetUid(state, action: PayloadAction<string>) {
			state.bet_uid = action.payload
		},
	},
})

export const UserDataActions = slice.actions

export default slice.reducer
