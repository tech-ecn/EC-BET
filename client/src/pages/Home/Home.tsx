import React, { Fragment, useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router'

import { Main } from '../../layouts/Main/Main'
import { BG } from './components/BG/BG'
import { MSC } from './components/MetamaskSucess/MetamaskSucess'
import { QRCodes } from './components/QRCodes/QRCodes'
import { SuccessBG } from './components/SuccessBG/SuccessBG'
import { CreateNewBet } from './components/CreateNewBet/CreateNewBet'
import './Home.scss'
// import { RightCards } from './RightCards'
import { API } from '../../API'
import Container from 'typedi'
import { ContractsInstance } from '../../utilities/getContractInstance'
import { useAppSelector } from '../../redux/hooks'
import { BetAddress } from '../../config'
import { useDispatch } from 'react-redux'
import { UserDataActions } from '../../redux/slices/UserData'
import { Nav } from '../../components/Nav/Nav'
import { RecentBets } from './components/RecentBets/RecentBets'
import { face2 } from '../../assets'
import { BetsLising as BetsListing } from './BetsLising'
import { FeaturedBet } from './components/FeaturedBet/FeaturedBet'

type bg = 'successBG' | 'msc' | 'qrc' | 'bg'

export const bignum = (window as any).BigNumber

const RecentBetsHome: React.FC = () => {
	const [bets, setBets] = useState([
		{
			uid: '',
			bet_amount: '2313',
			tx: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
			bet_instance_counter: '0',
			bettor_a: {
				name: '',
				profile: '',
			},
			bettor_b: {
				name: '',
				profile: '',
			},
			start: '',
			end: '',
			bet_name: '',
		},
	])

	React.useEffect(() => {
		API.open_bets()
			.then((data) => {
				setBets(data)
				console.log(data, 'bets')
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])
	return (
		<div className='card'>
			<div className='inner'>
				{bets.map((elem) => (
					<span
						onClick={() => {
							console.log(elem)
						}}
					>
						<RecentBets
							uid={elem?.uid}
							betName={elem?.bet_name}
							fOpp={elem?.bettor_a?.name ?? ''}
							sOpp={elem?.bettor_b?.name ?? ''}
							bet_amount={new bignum(elem.bet_amount).dividedToIntegerBy(Math.pow(10, 18)).toString()}
							fOppImg={elem?.bettor_a?.profile ?? face2}
							sOppImg={elem?.bettor_b?.profile ?? ''}
							data=''
							exp={new Date(elem.end).toLocaleString()}
							status='LIVE'
						></RecentBets>
					</span>
				))}
			</div>
		</div>
	)
}
export const Home: React.FC<RouteComponentProps & {}> = ({ history }) => {
	const [showBG, setShowBG] = useState<bg>('bg')
	const dispatch = useDispatch()
	const [formData, setFormData] = useState<{
		title: string
		budget: string
		date: string
		bet_type: string
		match: string
	}>({
		title: '',
		budget: '',
		date: '',
		bet_type: '',
		match: '',
	})

	// const update = useAppSelector((state) => state.userDataReducer.update)

	const setBG = useCallback((name: bg) => {
		setShowBG(name)
	}, [])

	const setFormDataHandler = useCallback((e) => {
		setFormData((formdata) => ({
			...formdata,
			[e.target.name]: e.target.value,
		}))
	}, [])

	const returnCurrBG = useCallback(
		(name: bg) => {
			switch (name) {
				case 'bg':
					return <BG></BG>
				case 'qrc':
					return <QRCodes clickHandler={setBG}></QRCodes>
				case 'msc':
					return <MSC></MSC>
				case 'successBG':
					return <SuccessBG data={formData} clickHandler={setBG}></SuccessBG>
				default:
					return
			}
		},
		[setBG, formData]
	)

	React.useEffect(() => {
		const uid = localStorage.getItem('uid')
		const token = localStorage.getItem('token')
		if (uid && token) {
			API.verify({ uid, token })
		} else {
			history.push('/')
		}
	}, [history])

	const option = useAppSelector((state) => state.userDataReducer.option)

	const primary = useAppSelector((state) => state.userDataReducer.primary)
	const contracts_loaded = useAppSelector((state) => state.userDataReducer.contracts_loaded)

	const handleCreate = async (data: { title: string; budget: string; date: string; bet_type: string; match: string }, name: any) => {
		const jwt = localStorage.getItem('token')
		const uid = localStorage.getItem('uid')
		if (!(uid && jwt)) {
			alert('Not logged in.')
			return
		}
		if (primary && contracts_loaded) {
			const contracts = Container.get(ContractsInstance)
			const bet = contracts.get_bet()
			const token = contracts.get_token()

			const wei = new bignum(data.budget).multipliedBy(Math.pow(10, 18))
			await token.methods.approve(BetAddress, wei).send({
				from: primary,
			})
			bet.methods
				.allowBet(data.match, wei)
				.estimateGas({
					from: primary,
				})
				.then((data) => {
					console.log(data)
				})
				.catch((err) => console.error(err))

			let tx = bet.methods.allowBet(data.match, wei).send({
				from: primary,
			})
			tx.on('transactionHash', function (hash: any) {
				console.log(`Transaction hash is ${hash}`)
				alert(`Transaction sent. Waiting for confirmation ..`)
			}).once('confirmation', function (confirmationNumber: any, receipt: { transactionHash: any }) {
				console.log(receipt)

				const bet_instance_counter = (receipt as any)?.events?.BetInstanceCounterUpdate?.returnValues?.bet_instance_counter

				const transactionHash = receipt.transactionHash
				console.log(bet_instance_counter, transactionHash)
				alert(bet_instance_counter)
				// setBetState((state) => ({
				// 	...state,
				// 	bet_counter,
				// 	tx: transactionHash,
				// 	start,
				// 	end,
				// }))

				const request_data = {
					tx: transactionHash,
					bet_amount: wei,
					uid: uid,
					bet_counter: data.match,
					bet_instance_counter,
					bet_name: formData.title,
				}
				// setTimeout(() => {
				// 	console.log(betState)
				// 	updateAPI({
				// 		...betState,
				// 		bet_counter,
				// 		tx: transactionHash,
				// 		start,
				// 		end,
				// 	})
				// }, 500)

				API.bet(request_data, jwt)
					.then((resp) => {
						if (resp) {
							console.log(resp.data)
							alert('Ok')
							dispatch(UserDataActions.setUpdate())
							setBG(name)
						}
					})
					.catch((err) => console.error(err))
			})
		}
	}

	return (
		<Fragment>
			<Nav></Nav>
			<Main
				Left={
					<div className=''>
						<div className='splitter header'>Create New Bet</div>
						<div className='card'>
							<div className='inner'>
								<CreateNewBet
									clickHandler={(name) => {
										console.log(formData)
										handleCreate(formData, name)
									}}
									state={formData}
									valueChangeHandler={setFormDataHandler}
								/>
							</div>
						</div>
						{FeaturedBet()}
					</div>
				}
				Right={
					<div>
						{/* <RightCards />
						<div className='RequestedBets'>
							<div className='splitter'>Requested Bets</div>
							<div className='card'>
								<div className='inner'>
									{new Array(5).fill(0).map(() => (
										<div className='row'>
											<div className='img'>
												<img src={face2} alt='' />
												<div className=''>
													<div className='name'>User Name</div>
													<div className='expires'>Joined 22 Feb 2020</div>
												</div>
											</div>
											<div className='num'>25</div>
										</div>
									))}
								</div>
							</div>
						</div> */}
					</div>
				}
				Center={
					<div>
						{returnCurrBG(showBG)}

						{option === 'listing' && <BetsListing></BetsListing>}
						{option === 'transactions' && <RecentBetsHome></RecentBetsHome>}
					</div>
				}
			></Main>
		</Fragment>
	)
}
