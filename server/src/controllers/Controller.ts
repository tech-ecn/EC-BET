import { JsonController, Get, OnUndefined, Param, Post, Body, HeaderParam, NotFoundError } from 'routing-controllers'
import { BetInstanceFunctions } from '../Models/BetInstance/BetInstanceFunction'
import { BetFunctions } from '../Models/Bet/BetFunctions'
import { Log } from '../App'
import { remove_buffer } from '../helper/remove_buffer'
import { UserFunctions } from '../Models/User/UserFunctions'
import UserRepository from '../Models/User/UserModel'

import { DocumentType } from '@typegoose/typegoose'

@JsonController('/')
export class MainController {
	constructor(private bet: BetFunctions, private bet_instance_functions: BetInstanceFunctions, private user: UserFunctions) {
		Log.info(this.bet_instance_functions.name())
	}

	@Get('/')
	@OnUndefined(500)
	get_() {
		this.user.make_admin('91498685-10f9-463e-8b9f-7a786896e86b')
		console.log(123)
		return {
			data: true,
		}
	}

	@Get('bets')
	@OnUndefined(500)
	async bets() {
		const bets = (await this.bet.get_bets()).map((elem) => {
			elem = Object.assign({}, elem.toJSON())
			delete elem['_id']
			return elem
		})
		console.log(bets)
		return bets
	}

	@Post('create_bet')
	@OnUndefined(500)
	async createBet(
		@HeaderParam('authorization') authorization: string,
		@Body()
		{ uid, betName, bet_counter, end, start, tx }: { uid: string; betName: string; bet_counter: number; end: number; start: number; tx: string }
	) {
		const user = (await this.user.verify({
			uid,
			authorization,
			internal: true,
		})) as DocumentType<UserRepository>

		console.log({ uid, betName, bet_counter, end, start, tx })

		if (user) {
			if (user.admin === true) {
				let _bet = await this.bet.create_a_bet({ betName, bet_counter, end, start, tx })
				_bet = Object.assign({}, _bet.toJSON())
				delete _bet['_id']
				return _bet
			} else {
				throw new NotFoundError('Path does not exist')
			}
		}
		return
	}

	@Post('bet_against')
	@OnUndefined(500)
	async bet_against(
		@HeaderParam('authorization') authorization: string,
		@Body() { uid, bet_uid, tx }: { bet_uid: string; uid: string; tx: string }
	) {
		const user = (await this.user.verify({
			uid,
			authorization,
			internal: true,
		})) as DocumentType<UserRepository>

		const address_b = user.uid
		this.bet_instance_functions.bet_against({
			bet_uid,
			user_id: uid,
			tx: tx,
		})
	}

	@Post('bet')
	@OnUndefined(500)
	async make_a_bet(
		@HeaderParam('authorization') authorization: string,
		@Body()
		{
			tx,
			bet_amount,
			uid,
			bet_counter,
			bet_instance_counter,
			bet_name,
		}: {
			tx: string
			bet_amount: string
			uid: string
			bet_counter: number
			bet_instance_counter: number
			bet_name: string
		}
	) {
		const user = (await this.user.verify({
			uid,
			authorization,
			internal: true,
		})) as DocumentType<UserRepository>

		const address_a = user.uid

		let data = await this.bet_instance_functions.make_a_bet({
			uid_a: address_a,
			tx,
			bet_amount,
			bet_counter,
			bet_instance_counter,
			bet_name,
		})
		data = remove_buffer(data, ['_id', 'bettor_a'])
		// ;(data as any).bettor_a = (data as any).bettor_a.toString()
		return data
	}

	@Get('get_available_bets')
	@OnUndefined(500)
	async get_available_bets() {
		const data = await this.bet_instance_functions.get_available_bets()

		return await Promise.all(
			data.map((elem) => {
				return remove_buffer(elem, ['_id'])
			})
		)
	}

	@Get('my_bets/:uid')
	@OnUndefined(500)
	async my_bets(@Param('uid') uid: string) {
		return await Promise.all(
			(await this.bet_instance_functions.my_bets(uid)).map((elem) => {
				return remove_buffer(elem, ['_id', 'bettor_a'])
			})
		)
	}

	@Get('bet_details/:uid')
	@OnUndefined(500)
	async bet_details(@Param('uid') uid: string) {
		const bet_data = await this.bet_instance_functions.get_bet(uid)
		return bet_data ? remove_buffer(bet_data, ['_id']) : {}
	}
}
