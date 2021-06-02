import { Service, Container } from 'typedi'
import UserRepository, { UserModel } from './UserModel'

import { v4 } from 'uuid'
import { compareSync, hashSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { ForbiddenError, NotFoundError, UnauthorizedError } from 'routing-controllers'
import { Log } from '../../App'

const User = Container.get(UserModel).model

@Service()
export class UserFunctions {
	async generate_jwt(uid: string) {
		return sign(uid, process.env.SECRET_KEY ?? 'secret_key')
	}

	async verify({ uid, authorization, internal = false }: { uid: string; authorization: string; internal?: boolean }) {
		const user = await User.findOne({ uid })

		if (user) {
			const _uid = await verify(authorization, process.env.SECRET_KEY ?? 'secret_key')
			if (_uid === uid) {
				if (internal) {
					return user
				}
				return true
			} else {
				throw new UnauthorizedError('Not allowed.')
			}
		} else throw new NotFoundError('User not found')
	}

	async login({ uid, password }: { uid: string; password: string }) {
		const user = await User.findOne({ uid })

		if (user) {
			if (compareSync(password, user.password)) {
				return { token: await this.generate_jwt(user.uid), uid: uid }
			} else {
				throw new ForbiddenError('Not allowed.')
			}
		} else throw new NotFoundError('User not found')
	}

	async login_email({ email, password }: { email: string; password: string }) {
		const user = await User.findOne({ email })

		if (user) {
			if (compareSync(password, user.password)) {
				return { token: await this.generate_jwt(user.uid), uid: user.uid }
			} else {
				throw new ForbiddenError('Not allowed.')
			}
		} else throw new NotFoundError('User not found')
	}

	async signup({ email, password, name }: { email: string; password: string; name: string }) {
		const user: UserRepository = {
			email,
			uid: v4(),
			bets: [],
			name,
			password: hashSync(password, 8),
		}
		await new User(user).save()

		const token = await this.generate_jwt(user.uid)

		return { token, uid: user.uid }
	}

	async make_admin(uid: string) {
		const user = await User.findOne({ uid })
		if (user) {
			user.admin = true
			await user.save()
			console.log(user)
		}
	}
}
