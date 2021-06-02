import React from 'react'
import './Login.scss'
import { Input } from '../../../components/Input/Input'
import { AuthBtn } from '../../../components/AuthBtn/AuthBtn'

interface PropsInt {
	state: {
		email: string
		password: string
	}
	changeHandler: (e: any) => void
	onClick: () => void
}

export const Login: React.FC<PropsInt> = ({ state, changeHandler, onClick }) => {
	return (
		<div className='LOGIN'>
			<div className='loginContainer'>
				<form
					method='POST'
					onSubmit={(e) => {
						e.preventDefault()
						onClick()
					}}
				>
					<Input
						name='Enter Username / Email Here'
						value={state.email}
						valueHandler={changeHandler}
						placeHolder='Enter Email Address'
						type='email'
						required
						tag='email'
					/>
					<Input
						name='Password Here'
						value={state.password}
						valueHandler={changeHandler}
						placeHolder='Password Here'
						type='password'
						required
						tag='password'
					/>
					<AuthBtn clickHandler={() => console.log(state.email, state.password)}>Login In</AuthBtn>
					<p>Forgot Password?</p>
				</form>
			</div>
		</div>
	)
}
