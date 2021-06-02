import { Service, Container } from 'typedi'
import BetInstanceRepository, { BetInstanceModel } from './BetInstanceModel'

import { v4 } from 'uuid'
import { UserModel } from '../User/UserModel'
import { NotFoundError } from 'routing-controllers'
import { AlreadyExists } from '../../controllers/errors/AlreadyExists'
import { BetModel } from '../Bet/BetModel'

const BetInstance = Container.get(BetInstanceModel).model
const Bet = Container.get(BetModel).model
const User = Container.get(UserModel).model
@Service()
export class BetInstanceFunctions {
	name() {
		return BetInstance.modelName
	}

	async bettorB({ uid_b: bettor_b, bet_uid }) {
		const user = await User.findOne({ uid: bettor_b })
		const bet = await BetInstance.findOne({ uid: bet_uid })
		if (!user) {
			throw new NotFoundError('User B not found.')
		}
		if (bet) {
			if (bet.bettor_b) {
				throw new AlreadyExists('Bet already exists.')
			}
			bet.bettor_b = user?._id
		} else {
			throw new NotFoundError('Bet not found.')
		}
	}

	async make_a_bet({
		uid_a: bettor_a,
		bet_name: bet_name,
		tx,
		bet_amount,
		bet_counter,
		bet_instance_counter,
	}: {
		uid_a: string
		tx: string
		bet_amount: string
		bet_counter: number
		bet_name: string
		bet_instance_counter: number
	}) {
		const user = await User.findOne({ uid: bettor_a })
		const bet_ = await Bet.findOne({ bet_counter: bet_counter })
		if (user && bet_) {
			let b: BetInstanceRepository = {
				bet_name: bet_name,
				bettor_a: user._id,
				bet_counter,
				tx,
				start: bet_.start,
				end: bet_.end,
				bet_amount,
				bet_instance_counter,
				uid: v4(),
			}

			let bet = new BetInstance(b)
			await bet.save()

			return bet
		}
		throw new NotFoundError(`User not found with address ${bettor_a}`)
	}

	async get_available_bets() {
		const available_bets = await BetInstance.find({
			bettor_b: null,
		} as any).populate('bettor_a', '-password -_id')
		console.log(available_bets)
		return available_bets
	}

	async bet_against({ bet_uid, user_id, tx }: { bet_uid: string; user_id: string; tx: string }) {
		const bet = await BetInstance.findOne({ uid: bet_uid })
		if (!bet?.bettor_b && bet) {
			const user = await User.findOne({ uid: user_id })
			if (user) {
				bet.bettor_b = user._id
				bet.tx_b = tx
				await bet.save()

				return bet
			} else {
				throw new NotFoundError('User not found')
			}
		} else {
			throw new NotFoundError('Bet not found')
		}
	}

	async my_bets(uid: string) {
		const user = await User.findOne({ uid })
		if (user) {
			return [
				...(await BetInstance.find({
					bettor_a: user._id,
				})),
				...(await BetInstance.find({
					bettor_b: user._id,
				})),
			]
		} else {
			return []
		}
	}
	async get_bets(uid: string) {
		await User.find({})
	}

	async get_bet(bet_uid: string) {
		return await BetInstance.findOne({ uid: bet_uid })
	}
}
