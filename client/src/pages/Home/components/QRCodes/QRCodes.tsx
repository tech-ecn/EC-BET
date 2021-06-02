import React from 'react'
import './QRCodes.scss'
import { metamask, ethqr, metamaskqr } from '../../../../assets/index'
import { Button } from '../../../../components/Button/Button'

export const QRCodes: React.FC<{ clickHandler: (name: any) => void }> = ({ clickHandler }) => {
	return (
		<div className='QRC'>
			<div className='codeContainer'>
				<div className='containerTop'>
					<p className='main'>Buy Via Etherum </p>
					{/* <p>Send ETH to below address from wallet </p> */}
				</div>
				<div className='containerCenter'>
					<img src={ethqr} alt='eth-qr' />
				</div>
				<div className='containerBottom'>
					<p className='address'>ETH Address</p>
					{/* <p>0x32be343b94f860124dc4fee278fdcbd38c102d86</p> */}
				</div>
				<div onClick={() => clickHandler('msc')}>
					<Button>Deposit Via ETH</Button>
				</div>
			</div>
			<div id='container-divider'></div>
			<div className='codeContainer'>
				<div className='containerTop'>
					<img src={metamask} alt='metamask' className='main' id='metamask-main-img' />
					{/* <p>Send ETH to below address from wallet </p> */}
				</div>
				<div className='containerCenter'>
					<img src={metamaskqr} alt='metamask-qr' id='metamask-img' />
				</div>
				<div className='containerBottom'>
					<p className='address'>ETH Address</p>
					{/* <p>0x4b15402b93f57a850418dbd267	b543d759c37790</p> */}
				</div>
				<div onClick={() => clickHandler('msc')}>
					<Button>Deposit Via Metamask</Button>
				</div>
			</div>
		</div>
	)
}
