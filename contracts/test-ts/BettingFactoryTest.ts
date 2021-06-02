import BigNumber from 'bignumber.js'
import { BetInstance, TestTokenInstance } from '../types'

const Bet = artifacts.require('Bet')
const TestToken = artifacts.require('TestToken')
const ether = Math.pow(10, 18)

const now = Math.floor(Date.now() / 1000)

const get_eth = (wei: BigNumber) => {
	return new BigNumber(wei.toString()).dividedBy(new BigNumber(ether)).toString()
}

const get_wei = (eth: number) => {
	return new BigNumber(eth * ether)
}

const TRUSTED_FORWARDER = '0xf82986f574803dffd9609be8b9c7b92f63a1410e'

contract('Bet', (accounts) => {
	let test_token_instance: TestTokenInstance
	let bet_instance: BetInstance

	let bettorA = accounts[1]
	let bettorB = accounts[2]
	let wallet = accounts[3]

	before('init', async () => {
		test_token_instance = await TestToken.new(TRUSTED_FORWARDER)
		const percent = 1

		bet_instance = await Bet.new(percent * 100, test_token_instance.address, wallet, '0xf82986f574803dffd9609be8b9c7b92f63a1410e')
	})

	it('create_bet', async () => {
		const transaction = await bet_instance.createBet(now + 20, now + 60, {
			from: wallet,
		})
		console.log(transaction)
		await test_token_instance.increaseAllowance(bet_instance.address, get_wei(100), {
			from: bettorA,
		})
		await test_token_instance.increaseAllowance(bet_instance.address, get_wei(100), {
			from: bettorB,
		})
	})

	it('allow A', async () => {
		await test_token_instance.mint({ from: bettorA })

		await halt(20)
		await bet_instance.allowBet(1, get_wei(20), {
			from: bettorA,
		})
		await get_balances(test_token_instance, accounts, bet_instance)
	})

	it('allow Bet against', async () => {
		await test_token_instance.mint({ from: bettorB })
		await bet_instance.allowBetAgainst(1, {
			from: bettorB,
		})
		await get_balances(test_token_instance, accounts, bet_instance)
	})

	it('declare result', async () => {
		await halt(40)
		await test_token_instance.mint({ from: bettorB })
		await bet_instance.declareResult(1, 2, {
			from: wallet,
		})
		await get_balances(test_token_instance, accounts, bet_instance)
	})

	it('withdraw', async () => {
		await bet_instance.withdraw(1, {
			from: bettorA,
		})
		await get_balances(test_token_instance, accounts, bet_instance)
	})
	// it('init', async () => {
	// 	const balance = await test_token_instance.balanceOf(accounts[0])
	// 	console.log(get_eth(balance))

	// 	const amount = get_wei(1)

	// 	// Transfer tokens to bettor A and B
	// 	await test_token_instance.transfer(bettorA, amount)
	// 	await test_token_instance.transfer(bettorB, amount)

	// 	// Place bet from A
	// 	await test_token_instance.increaseAllowance(bet_instance.address, amount, {
	// 		from: bettorA,
	// 	})

	// 	await get_balances(test_token_instance, accounts, bet_instance)

	// 	await bet_instance.createBet(amount, now + 10, {
	// 		from: bettorA,
	// 	})

	// 	await test_token_instance.increaseAllowance(bet_instance.address, amount, {
	// 		from: bettorB,
	// 	})

	// 	assert.equal((await test_token_instance.balanceOf(bet_instance.address)).toString(), amount.toString())

	// 	// Place bet from B on A
	// 	await bet_instance.allowBettorB(1, {
	// 		from: bettorB,
	// 	})

	// 	await get_balances(test_token_instance, accounts, bet_instance)

	// 	assert.equal((await test_token_instance.balanceOf(bet_instance.address)).toString(), new BigNumber(2 * ether).toString())

	// 	const func = async () =>
	// 		new Promise((resolve) => {
	// 			console.log('halt for 10')
	// 			setTimeout(() => {
	// 				resolve({})
	// 			}, 10 * 1000)
	// 		})
	// 	await func()
	// 	// Declare A winner from wallet
	// 	await bet_instance.declareResult(1, bettorA, {
	// 		from: wallet,
	// 	})
	// 	await get_balances(test_token_instance, accounts, bet_instance)
	// 	await bet_instance.withdraw(1, {
	// 		from: bettorA,
	// 	})
	// 	await get_balances(test_token_instance, accounts, bet_instance)
	// })
})
async function halt(t: number) {
	await new Promise((r) => {
		let i = 0
		let data = ['|', '/', '-', '\\']
		const interval = setInterval(() => {
			process.stdout.write(`${data[i++ % 4]} ${i} / ${t} \r`)
		}, 1000)
		setTimeout(() => {
			r(null)
			clearInterval(interval)
		}, t * 1000)
	})
}

async function get_balances(test_token_instance: TestTokenInstance, accounts: Truffle.Accounts, bet_instance: BetInstance) {
	console.log('0:', get_eth(await test_token_instance.balanceOf(accounts[0])))
	console.log('1:', get_eth(await test_token_instance.balanceOf(accounts[1])))
	console.log('2:', get_eth(await test_token_instance.balanceOf(accounts[2])))
	console.log('W:', get_eth(await test_token_instance.balanceOf(accounts[3])))
	console.log('B:', get_eth(await test_token_instance.balanceOf(bet_instance.address)))
}
