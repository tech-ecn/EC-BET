import { JsonController, OnUndefined, Post, Body, Get, HeaderParam, Param } from 'routing-controllers'
import { Log } from '../App'
import { UserFunctions } from '../Models/User/UserFunctions'

import { AlreadyExists } from './errors/AlreadyExists'

@JsonController('/user/')
export class UserController {
	constructor(private user_functions: UserFunctions) {}

	@Post('signup')
	@OnUndefined(500)
	async signup(@Body() { email, password, name }: { address: string; email: string; password: string; name: string }) {
		try {
			return await this.user_functions.signup({
				email,
				password,
				name,
			})
		} catch (err) {
			console.log(err)
			if (err.code === 11000) {
				Log.error(err.code)
				throw new AlreadyExists('User already exists')
			} else {
				Log.error('err', err)
			}
		}
		return undefined
	}

	@Get('verify/:uid')
	@OnUndefined(500)
	async verify(@HeaderParam('Authorization') authorization: string, @Param('uid') uid: string) {
		return await this.user_functions.verify({ uid, authorization })
	}

	@Post('login')
	@OnUndefined(500)
	async login_email(@Body() { email, password }: { email: string; password: string }) {
		return await this.user_functions.login_email({
			email,
			password,
		})
	}
	@Post('login/:uid')
	@OnUndefined(500)
	async login(@Param('uid') uid: string, @Body() { password }: { password: string }) {
		return await this.user_functions.login({
			uid,
			password,
		})
	}
}
