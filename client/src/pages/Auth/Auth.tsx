import React, { useState, useCallback } from 'react'
import './Auth.scss'
import { Register } from './Register/Register'
import { Login } from './Login/Login'
import { API } from '../../API'
import { RouteComponentProps } from 'react-router'
import LogoNav from '../../components/LogoNav/LogoNav'

export const Auth: React.FC<RouteComponentProps> = ({ history }) => {
	const [currAuth, setCurrAuth] = useState<'login' | 'register'>('register')
	const [loginForm, setLoginForm] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	})
	const [regForm, setRegForm] = useState<{ email: string; password: string; confP: string; name: string }>({
		email: '',
		password: '',
		confP: '',
		name: '',
	})

	const setLoginState = useCallback((e) => {
		setLoginForm((formdata) => ({
			...formdata,
			[e.target.name]: e.target.value,
		}))
	}, [])

	const setRegState = useCallback((e) => {
		setRegForm((formdata) => {
			console.log(formdata)
			return {
				...formdata,
				[e.target.name]: e.target.value,
			}
		})
	}, [])

	const handleClickLogin = async () => {
		try {
			const { email, password } = loginForm

			const resp = await API.login({ email, password })
			if (resp) {
				const { token, uid } = resp.data
				localStorage.setItem('token', token)
				localStorage.setItem('uid', uid)

				alert('Logged In')
				history.push('/dashboard')
			} else {
				alert('Failed to login')
			}
		} catch (err) {
			console.error(err)
			alert(err)
		}
	}

	const handleClickRegister = async () => {
		try {
			const { email, password, confP, name } = regForm
			console.log(regForm)
			if (confP === password) {
				await API.register({ email, password, name })

				alert('Registered Successfully')
				setCurrAuth('login')
			} else {
				alert("Passwords don' match")
			}
		} catch (err) {
			console.error(err)
			alert(err)
		}
	}
	return (
		<div className='AUTH'>
			<div className='authContainer'>
				<LogoNav />
				<div className='componentContainer'>
					<div className='headingContainer'>
						<div className={`headers ${currAuth === 'login' ? 'active' : null}`} onClick={() => setCurrAuth('login')}>
							<p>Sign In</p>
						</div>
						<div className={`headers ${currAuth === 'register' ? 'active' : null}`} onClick={() => setCurrAuth('register')}>
							<p>Sign Up</p>
						</div>
					</div>
					{currAuth === 'login' ? (
						<Login
							changeHandler={setLoginState}
							state={loginForm}
							onClick={() => {
								handleClickLogin()
							}}
						/>
					) : (
						<Register
							state={regForm}
							changeHandler={setRegState}
							onClick={() => {
								handleClickRegister()
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
