import React, { useState } from 'react'
import Navigation from './components/nav'
import Child from './components/child'
import Home from './components/home'
// import LazyLoad from 'react-lazyload'
import './App.css'
import { Switch, Route } from 'react-router-dom'

function App() {
	const [ toggleTitle, setToggleTitle ] = useState(true)
	const titleToggle = () => setToggleTitle((prevState) => !prevState)
	// const location = useLocation()

	return (
		<div className="flex flex-col items-center w-screen min-h-screen">
			<Navigation />
					<Switch>
						<Route path="/dhammapada" component={Home} />
						<Route path="/:id" children={<Child title={toggleTitle} click={titleToggle} />} />
					</Switch>
		</div>
	)
}

export default App
