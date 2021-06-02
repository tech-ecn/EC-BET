import React, { Fragment } from 'react'
import './Main.scss'

export const Main: React.FC<{
	Left: React.ReactNode
	Right: React.ReactNode
	Center: React.ReactNode
}> = ({ Left, Right, Center }) => {
	return (
		<Fragment>
			<div id='Main' className=''>
				<div className='Base'>
					<div className='Context Left'>{Left}</div>
					<div className='Context Center'>{Center}</div>
					<div className='Context Right'> {Right}</div>
				</div>
			</div>
		</Fragment>
	)
}
