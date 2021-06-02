import React from 'react'
import './WalletTransactions.scss'

interface PropInt {
	eth: string
	id: string
	ecn: string
	tag: string
	type: 0 | 1
	winner: any
}

export const WTC: React.FC<PropInt> = ({ eth, id, ecn, tag, type, winner }) => {
	return (
		<div className='WTC'>
			<div className='wtcContainer'>
				<p className='valueText'>{eth}</p>
				<p className='idText'>{id}</p>
				<p className='dfbText'>{ecn}</p>
				<p className={type === 0 ? 'approvedText' : 'pendingText'}>{tag}</p>
			</div>
		</div>
	)
}
