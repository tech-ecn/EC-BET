import React from 'react'
import styles from './Input.module.scss'

interface PropsInt {
	name: string
	value: string
	type: string
	valueHandler: (e: any) => void
	placeHolder: string
	tag: string
	required?: boolean
}

export const Input: React.FC<PropsInt> = ({ name, value, valueHandler, placeHolder, type, tag, required }) => {
	return (
		<div className={styles.inputContainer}>
			<label htmlFor={name}>{name}</label>
			<input name={tag} autoComplete='off' value={value} onChange={(e) => valueHandler(e)} placeholder={placeHolder} type={type} required />
		</div>
	)
}
