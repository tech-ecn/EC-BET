import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './Question.module.scss'

export const Questions: React.FC<{ name: string }> = ({ name, children }) => {
	const [showdata, setShowdata] = React.useState<boolean>(false)
	return (
		<div className={styles.questionsSection}>
			<div className={styles.title} onClick={() => setShowdata((data) => !data)}>
				{name}
				<div>
					<FontAwesomeIcon
						icon={showdata ? faArrowUp : faArrowDown}
						color='gray'
						size='lg'
						style={{ border: '1px solid rgb(170, 164, 164)', padding: '0.24rem', borderRadius: '100%' }}
					/>
				</div>
			</div>
			{showdata && <div className={styles.data}>{children}</div>}
		</div>
	)
}
