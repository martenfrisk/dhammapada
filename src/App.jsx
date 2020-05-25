import React from 'react'
import Navigation from './components/nav'
import Child from './components/child'
import Home from './components/home'
// import LazyLoad from 'react-lazyload'
import './App.css'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

function App() {
	const location = useLocation()
	const transitions = useTransition(location, location => location.pathname, {
		from: { opacity: 0, display: 'none' },
		enter: { opacity: 1, display: 'block' },
		leave: { opacity: 0, display: 'none' },
	  })
	return (
		<div className="flex flex-col items-center w-screen min-h-screen py-10">
			<Navigation />
			{transitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<Switch location={item}>
						<Route path="/dhammapada" component={Home} />
						<Route path="/:id" component={Child} />
					</Switch>
				</animated.div>
			))}
			<div className="my-auto mb-0 text-xs font-light text-red-900 lowercase">Footer content</div>
		</div>
	)
}

export default App
