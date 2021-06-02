import React from 'react'
import { useDispatch } from 'react-redux'
import { UserDataActions } from '../../../../redux/slices/UserData'
import './RecentBets.scss'

interface PropInt {
	fOpp: string
	sOpp: string
	fOppImg: string
	sOppImg: string
	data: string
	exp: string
	status: string
	bet_amount: string
	betName: string
	uid: string
}

export const RecentBets: React.FC<PropInt> = ({ fOpp, sOpp, fOppImg, sOppImg, data, exp, status, bet_amount, betName, uid }) => {
	const dispatch = useDispatch()
	return (
		<div className='RBets'>
			<div className='recentBetsContainer'>
				<div className='topContainer'>
					{betName}
					<div className='oppContainer'>
						<div className='fOpp'>
							<p>{fOpp}</p>
							<img className='image_placeholder' src={fOppImg} alt='opp-1' />
						</div>
						<div className='divider'>VS</div>
						<div className='sOpp'>
							<img className='image_placeholder' src={sOppImg} alt='opp-1' />
							<p>{sOpp}</p>
						</div>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault()
							dispatch(UserDataActions.setBetUid(uid))
						}}
					>
						BET : {bet_amount} ECN
					</button>
				</div>
				<div className='centerContainer'>{data}</div>
				<div className='bottomContainer'>
					<p>{exp}</p>
					<div>{status}</div>
				</div>
			</div>
		</div>
	)
}
