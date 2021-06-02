import React from 'react'
import './MetamaskSuccess.scss'
import { greenTick, metamask } from '../../../../assets/index'

export const MSC: React.FC = () => {
	return (
		<div className='MSC'>
			<div className='mscContainer'>
				<img src={greenTick} alt='green-check' id='green-check' />
				<img src={metamask} alt='metamask' id='metamask-logo' />
				<p>
					We have recieved your Transaction Deposite and we are processing your request, We will let you know the fund transfer once its
					deposited in our nodes.
				</p>
			</div>
		</div>
	)
}
