import Container, { Service } from 'typedi'
import Web3 from 'web3'
import { Biconomy } from './getBiconomy'
// eslint-disable-next-line

@Service()
export class Web3Instance {
	private instance: Web3 | null = null

	async getWeb3(): Promise<Web3> {
		if (this.instance === null) {
			try {
				await window.ethereum.enable()
				this.instance = new Web3(Web3.givenProvider || 'http://localhost:8545')
			} catch (error) {
				throw error
			}
		}
		return this.instance
	}
}

@Service()
export class BiconomyInstance {
	private instance: Web3 | null = null
	public biconomy: any | null = null

	async getWeb3(): Promise<Web3> {
		// const matic_provider = process.env.REACT_APP_MATIC_PROVIDER as string
		const biconomy = new Biconomy(window.ethereum, {
			apiKey: process.env.REACT_APP_BICONOMY,
			debug: true,
		})
		this.biconomy = biconomy
		this.instance = new Web3(biconomy)
		await new Promise<void>((resolve) => {
			biconomy
				.onEvent(biconomy.READY, () => {
					console.log('Biconomy is Ready')

					resolve()
				})
				.onEvent(biconomy.ERROR, (error: any, message: any) => {
					console.error(error, message)
				})
		})
		return this.instance
	}
}

export async function getWeb3({ biconomy }: { biconomy: boolean } = { biconomy: false }): Promise<Web3> {
	if (biconomy === true) return Container.get(BiconomyInstance).getWeb3()
	else return Container.get(Web3Instance).getWeb3()
}

export async function getAccounts({ biconomy }: { biconomy: boolean }) {
	const web3 = await getWeb3({ biconomy })
	return web3.eth.getAccounts()
}
