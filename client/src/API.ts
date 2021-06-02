import axios from 'axios'

const API_LINK = process.env.REACT_APP_API_LINK || 'http://localhost:8080/'

const resolve_url = (link: string) => {
	return new URL(link, API_LINK).href
}

export class API {
	static async verify({ uid, token }: { uid: string; token: string }) {
		try {
			const data = await axios.get(resolve_url(`user/verify/${uid}`), {
				headers: {
					Authorization: token,
				},
			})
			if (data.status === 200) {
				return
			} else throw new Error('Not verified')
		} catch (err) {
			localStorage.clear()
			window.location.reload()
		}
	}

	static async register({ email, password, name }: { email: string; password: string; name: string }) {
		try {
			return await axios.post(resolve_url('user/signup'), {
				email,
				password,
				name,
			})
		} catch (err) {
			API.handleError(err, 'Failed to register')
		}
	}

	static async open_bets() {
		return (await axios.get(resolve_url('get_available_bets'))).data
	}

	static async my_bets(uid: string) {
		return (await axios.get(resolve_url(`my_bets/${uid}`))).data
	}

	static async bet_details(uid: string) {
		return (await axios.get(resolve_url(`bet_details/${uid}`))).data
	}

	static async bet(
		{
			tx,
			bet_amount,
			uid,
			bet_counter,
			bet_name,
			bet_instance_counter,
		}: {
			tx: string
			bet_amount: string
			uid: string
			bet_name: string
			bet_counter: string
			bet_instance_counter: string
		},
		token: string
	) {
		try {
			return await axios.post(
				resolve_url('bet'),
				{
					tx,
					bet_amount,
					uid,
					bet_counter,
					bet_instance_counter,
					bet_name,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
		} catch (err) {
			API.handleError(err)
		}
	}

	static async bets() {
		try {
			const return_data =
				(
					await axios.get<
						Array<{
							uid: string
							betName: string
							bet_counter: number
							end: string
							start: string
							tx: string
						}>
					>(resolve_url('bets'))
				).data.map((elem) => ({ ...elem, end: new Date(elem.end), start: new Date(elem.end) })) ?? []
			return return_data
		} catch (err) {
			console.error(err)
			if (err.response) {
				console.error(err?.resposnse?.data)
				console.error(err?.resposnse?.status)
			}
		}
		return []
	}

	static async create_a_bet({
		body,
		token,
	}: {
		body: { uid: string; betName: string; bet_counter: string; end: number; start: number; tx: string }
		token: string
	}) {
		try {
			return await axios.post(resolve_url('create_bet'), body, {
				headers: {
					Authorization: token,
				},
			})
		} catch (err) {
			API.handleError(err, 'Failed to update backend.')
		}
	}

	static async bet_against(body: { bet_uid: string; uid: string; tx: string }, token: string) {
		try {
			return await axios.post(resolve_url('bet_against'), body, {
				headers: {
					Authorization: token,
				},
			})
		} catch (err) {
			API.handleError(err)
		}
	}

	static async login({ email, password }: { email: string; password: string }) {
		try {
			return await axios.post<{
				uid: string
				token: string
			}>(resolve_url('user/login/'), {
				email,
				password,
			})
		} catch (err) {
			API.handleError(err, 'Failed to Login')
		}
	}

	private static handleError(err: any, msg?: string) {
		console.error(err)
		if (err.response) {
			console.error(err?.resposnse?.data)
			console.error(err?.resposnse?.status)
		}
		throw new Error(msg ?? '')
	}
}
