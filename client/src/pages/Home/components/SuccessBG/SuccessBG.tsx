import React from 'react'
import './SucessBG.scss'
import { greenTick, face2, face3 } from '../../../../assets/index'
import { Button } from '../../../../components/Button/Button'

export const SuccessBG: React.FC<{
	data: { title: string; budget: string; date: string; bet_type: string; match: string }
	clickHandler: (name: any) => void
}> = ({ clickHandler, data }) => {
	return (
		<div className='SBGContainer'>
			<div id='topContainer'>
				<img src={greenTick} alt='green-tick' />
				<h1>Bet Created Succesfully !</h1>
				<div></div>
			</div>
			<div id='centerContainer'>
				<h1>{data.title}</h1>
				<div style={{ display: 'none' }} id='opponentContainer'>
					<div id='firstOpp'>
						<div id='fOppData'>
							<h3>Kinie Member</h3>
							<p>Bet Creator</p>
						</div>
						<img src={face2} alt='first-opp' />
					</div>
					<div id='oppDivider'>
						<p id='first'>VS</p>
						<p>LIVE</p>
					</div>
					<div id='secondOpp'>
						<img src={face3} alt='second-opp' />
						<div id='sOppData'>
							<h3>Vinshu Gupta</h3>
							<p>Member</p>
						</div>
					</div>
				</div>
			</div>
			<div id='bottom-container'>
				<div onClick={() => {}}>
					<Button>BET : {data.budget} ECN</Button>
				</div>
				<p>Expires on : {data.date}</p>
			</div>
		</div>
	)
}
