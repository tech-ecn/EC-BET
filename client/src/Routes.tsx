import React, { Fragment, useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { CreateBet } from './components/CreateBet'
// import { Nav } from './components/Nav/Nav'
import { PlaceBet } from './components/PlaceBet'

import { LoadContractsHook } from './hooks/LoadContractsHook'
import { Home } from './pages/Home/Home'
import { Auth } from './pages/Auth/Auth'
import { DeclareResult } from './components/DeclareResult'
import { Landing } from './pages/Landing/Landing'

export const LoadContracts: React.FC<{}> = ({ children }) => {
	const [loaded, setLoaded] = useState(false)
	LoadContractsHook({ setLoaded })

	return <Fragment>{loaded && children}</Fragment>
}

export const Routes: React.FC = () => {
	return (
		<>
			<Router>
				<Switch>
					<Route path='/home' component={Landing} />
					<Route path='/' component={Home} exact />
					<Route path='/auth' component={Auth} />
					{/* Testing Routes */}
					<Route path='/test'>
						<div className=''>
							<div className=''>Index</div>
							<CreateBet></CreateBet>
							<PlaceBet></PlaceBet>
							<DeclareResult></DeclareResult>
						</div>
					</Route>
				</Switch>
			</Router>
		</>
	)
}
