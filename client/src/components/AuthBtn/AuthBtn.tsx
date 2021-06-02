import React from 'react'
import styles from './AuthBtn.module.scss'

export const AuthBtn: React.FC<{ clickHandler: (e: any) => void }> = ({ children, clickHandler }) => {
	return (
		<div className={styles.authBtnContainer}>
			<button onClick={(e) => clickHandler(e)}>{children}</button>
		</div>
	)
}
