import { Service } from 'typedi'
import { Bet } from '../types/Bet'
import { ERC20 } from '../types/ERC20'
import { Migrations } from '../types/Migrations'

@Service()
export class ContractsInstance {
	private migrations: Migrations | null
	private bet: Bet | null
	private token: ERC20 | null

	constructor() {
		this.migrations = null
		this.bet = null
		this.token = null
	}

	set_migration(migrations: Migrations) {
		this.migrations = migrations
	}

	set_bet(betting_factory: Bet) {
		this.bet = betting_factory
	}

	set_token(token: ERC20) {
		this.token = token
	}

	get_migration(): Migrations {
		if (this.migrations) return this.migrations
		else throw new Error('Migrations not initialized.')
	}

	get_bet(): Bet {
		if (this.bet) return this.bet
		else throw new Error('Betting Factory not loaded.')
	}

	get_token(): ERC20 {
		if (this.token) return this.token
		else throw new Error('Token not loaded.')
	}
}
