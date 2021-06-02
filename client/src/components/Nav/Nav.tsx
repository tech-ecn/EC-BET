import { Fragment } from 'react'
import { logo, face } from '../../assets/index'
import './Nav.scss'

export const Nav: React.FC<{}> = () => {
	return (
		<Fragment>
			<div className='Nav'>
				<div className='outer'>
					<div className='left'>
						<img src={logo} alt='' />
					</div>
					<div className='right'>
						<div className='username bold uppercase'></div>
						<div
							style={{ padding: '0.4rem 0.7rem' }}
							onClick={() => {
								window.location.reload()
								localStorage.clear()
							}}
							className='common bttn uppercase'
						>
							Logout
						</div>
						<div className='circle'>
							<img src={face} alt='' />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
