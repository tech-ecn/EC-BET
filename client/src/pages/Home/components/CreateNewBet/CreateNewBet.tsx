import React from 'react'
import { Fragment, useState } from 'react'
import { PromiseValue } from 'type-fest'
import { API } from '../../../../API'

import './CreateNewBet.scss'

interface PropsInf {
	state: {
		title: string
		budget: string
		date: string
		bet_type: string
		match: string
	}
	clickHandler: (name: any) => void
	valueChangeHandler: (e: any) => void
}

export const CreateNewBet: React.FC<PropsInf> = ({ clickHandler, state, valueChangeHandler }) => {
	const [date, setDate] = useState(new Date())
	const [trending, setTrending] = useState<PromiseValue<ReturnType<typeof API.bets>>>([] as Array<any>)

	React.useEffect(() => {
		const run = async () => {
			setTrending(await API.bets())
		}
		run()
	}, [])
	return (
		<Fragment>
			<div className='CreateNewBet'>
				<div className='form'>
					<div className='wrapper'>
						<label htmlFor='title' className='label'>
							<p>Title of Bet</p>
						</label>
						<input
							placeholder={'Title of Bet'}
							type='text'
							name='title'
							id='title'
							value={state.title}
							onChange={(e) => valueChangeHandler(e)}
						/>
					</div>
					<div className='wrapper'>
						<label htmlFor='budget' className='label'>
							<p>Budget of Bet</p>
						</label>
						<input
							placeholder={'Budget of Bet'}
							type='text'
							name='budget'
							id='budget'
							value={state.budget}
							onChange={(e) => valueChangeHandler(e)}
						/>
					</div>

					<div className='wrapper'>
						<label htmlFor='bet_type' className='label'>
							<p>Bet Type</p>
						</label>
						<select name='bet_type' id='bet_type' onChange={(e) => valueChangeHandler(e)}>
							<option>Select Bet Type</option>
							{['Open to Everyone'].map((item) => (
								<option value={item}>{item}</option>
							))}
						</select>
					</div>
					<div className='wrapper'>
						<label htmlFor='match' className='label'>
							<p>Select Trending Match</p>
						</label>
						<select
							name='match'
							id='match'
							onChange={(e) => {
								valueChangeHandler(e)
							}}
						>
							<option>Select Trending Match</option>
							{trending.map((item) => (
								<option
									onClick={() => {
										console.log(new Date(item.end))
										setDate(new Date(item.end))
									}}
									value={item.bet_counter}
								>
									{item.betName}
								</option>
							))}
						</select>
					</div>
					<div className='wrapper'>
						<label htmlFor='date' className='label'>
							<p>Date of Result</p>
						</label>
						<input
							disabled
							placeholder={'Select Date and Timeslot'}
							type='date'
							name='date'
							id='date'
							value={date.toLocaleDateString('fr-CA', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
							})}
							onChange={(e) => {
								console.log(e.target.value)
								valueChangeHandler(e)
							}}
						/>
					</div>
					<div className='wrapper'>
						<div className='submit bttn' onClick={() => clickHandler('successBG')}>
							Create and Pubilsh Bet
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
