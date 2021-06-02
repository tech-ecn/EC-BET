import React from 'react'
import styles from './LogoNav.module.scss'
import { ecnLogo } from '../../assets/index'
import { withRouter, RouterProps } from 'react-router-dom'

const LogoNav: React.FC<RouterProps> = ({ history }) => {
	return (
		<div className={styles.navContainer}>
			<img src={ecnLogo} alt='vbet-logo'></img>
			<ul>
				<li onClick={() => history.push('/home')}>Home</li>
				<li onClick={() => null}>Head-To-Head Bets</li>
				<li onClick={() => history.push('/auth')}>Register Now</li>
			</ul>
		</div>
	)
}

export default withRouter(LogoNav)
