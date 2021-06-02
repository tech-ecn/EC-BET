import { Service, Container } from 'typedi'

import { v4 } from 'uuid'
import { UserModel } from '../User/UserModel'
import { NotFoundError } from 'routing-controllers'
import { AlreadyExists } from '../../controllers/errors/AlreadyExists'
import BetRepository, { BetModel } from './BetModel'

const Bet = Container.get(BetModel).model

@Service()
export class BetFunctions {
	name() {
		return Bet.modelName
	}

	async get_bets() {
		return (await Bet.find({})).filter((elem) => {
			if (elem.start > new Date() || elem.end < new Date()) {
				return false
			} else {
				return true
			}
		})
	}

	async create_a_bet({ betName, bet_counter, end, start, tx }: { betName: string; bet_counter: number; end: number; start: number; tx: string }) {
		const bet_data: BetRepository = {
			uid: v4(),
			betName,
			bet_counter,
			end: new Date(1000 * end),
			start: new Date(1000 * start),
			tx,
		}

		const bet = new Bet(bet_data)
		await bet.save()

		return bet
	}
}
