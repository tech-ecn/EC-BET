import React from 'react'
import './Register.scss'
import { Input } from '../../../components/Input/Input'
import { AuthBtn } from '../../../components/AuthBtn/AuthBtn'

interface PropsInf {
	state: {
		email: string
		password: string
		confP: string
		name: string
	}
	onClick: () => void
	changeHandler: (e: any) => void
}

export const Register: React.FC<PropsInf> = ({ onClick, state, changeHandler }) => {
	return (
		<div className='REGISTER'>
			<div className='registerContainer'>
				<form
					method='post'
					onSubmit={(e) => {
						e.preventDefault()
						onClick()
					}}
				>
					<Input name='Name' required value={state.name} valueHandler={changeHandler} placeHolder='Your Name ' type='text' tag='name' />
					<Input
						name='Enter Username / Email Here'
						value={state.email}
						valueHandler={changeHandler}
						placeHolder='Enter Email Address'
						type='email'
						tag='email'
						required
					/>
					<Input
						name='Password Here'
						value={state.password}
						valueHandler={changeHandler}
						placeHolder='Password Here '
						type='password'
						tag='password'
						required
					/>
					<Input
						name='Confirm Password'
						value={state.confP}
						valueHandler={changeHandler}
						placeHolder='Password Here '
						type='password'
						tag='confP'
						required
					/>
					<button>Upload Your Photo</button>
					<AuthBtn clickHandler={() => console.log(state)}>Register Now</AuthBtn>
					<p>Forgot Password?</p>
				</form>
			</div>
		</div>
	)
}
