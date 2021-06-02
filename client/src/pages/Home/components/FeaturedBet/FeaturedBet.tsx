import { face2 } from '../../../../assets'

import './FeaturedBet.scss'

export function FeaturedBet() {
	return (
		<div className='FeaturedBet'>
			<div className='splitter header'>Featured Bet</div>
			<div className='card'>
				<div className='inner'>
					<div className='featured'>
						<div className='text'>This time IPL won by Mumbai Indians what say?? Bet 2.5 ECN</div>
						<div className='faceoff'>
							<div className='img'>
								<img src={face2} alt='' />
							</div>
							<div className='centered'>
								<div className='vs'>VS</div>
								<div className='live'>LIVE</div>
							</div>
							<div className='img'>
								<img src={face2} alt='' />
							</div>
						</div>
						<div className='bttn'>BET: 20 ECN</div>
						<div className='expires'>Expires: 1 July 2021</div>
					</div>
				</div>
			</div>
		</div>
	)
}
