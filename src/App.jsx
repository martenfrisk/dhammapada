import React, { useState } from 'react'
import lotus from './img/lotus.svg'
import { dhp } from './dhp-1'
import LazyLoad from 'react-lazyload'
import { Transition, CSSTransition } from 'react-transition-group'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'

function App() {
	
	return (
		<Router>
			<div className="flex flex-col items-center w-screen min-h-screen py-10">
			<div>

				<Link to="/" className="inline-block px-6 py-2 mx-2 text-red-800 bg-red-200 rounded-md">Home</Link>
				<Link to="/1" className="inline-block px-6 py-2 mx-2 text-red-800 bg-red-200 rounded-md">Chapter 1</Link>
				<Link to="/2" className="inline-block px-6 py-2 mx-2 text-red-800 bg-red-200 rounded-md">Chapter 2</Link>
			</div>
				<Switch>
					<Route exact path="/" children={<Home />} />
					<Route path="/:id" children={<Child />} />
				</Switch>
				<div className="my-auto mb-8 font-light lowercase">Footer content</div>
			</div>
		</Router>
	)
}

const Home = () => {
	const [ textView, setTextView ] = useState(false)

	return (
		<CSSTransition unmountOnExit in={!textView} timeout={{ enter: 0, exit: 500 }} classNames="fade">
		<div className="flex flex-col items-center self-center w-1/2 mt-20 text-2xl">
			<div className="text-3xl font-normal text-red-900">Dhammapada Reader</div>
			<img src={lotus} className="w-16 h-16 mt-16 mb-16 " alt="Lotus flower" />
		</div>
	</CSSTransition>
	
	)
}

function Child() {
	let { id } = useParams()
	let currText = dhp[id]
	let currID = id

	const defaultStyle = {
		transition: 'opacity 700ms ease-in-out',
		opacity: 0
	}

	const transitionStyles = {
		entering: { opacity: 0 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 }
	}
	function addLineBreaks(arr, i) {
		let verseNr = i
		verseNr++
		return arr.map((item, index) => {
			let ex = "w-full"
			let clas = item[0] + ' ' + ex
			return (
				<div className="flex justify-center w-full">
					<div className="w-10 pr-12 text-xs text-right text-red-800">
						{index === 0 ? (
							<div id={verseNr}>
								<a href={`#${verseNr}`}>{verseNr}</a>
							</div>
						) : (
							' '
						)}
					</div>
					{/* <div className="w-10"> </div> */}
					<div className={clas}>
						{item[1]}
						<br />
					</div>
				</div>
			)
		})
	}
	const onWheelTwo = (e) => {
		if (e.deltaY !== 0) {
			e.preventDefault()
			e.stopPropagation()
			var scrollX = scrollJack(e.deltaX, e.deltaY)
			document.getElementById('container').scrollBy(scrollX, 0)
		}
	}
	const scrollJack = (dx, dy) => {
		// var magnitude = Math.pow(dx * dx + dy * dy, 0.5)
		var direction = dy + dx > 0 ? 1 : -1
		return direction
	}
	// const onWheel = (e) => {
	// 	e.preventDefault()
	// 	var container = document.getElementById('container')
	// 	var containerScrollPosition = document.getElementById('container').scrollLeft
	// 	container.scrollTo({
	// 		top: 0,
	// 		left: containerScrollPosition + e.deltaY,
	// 		behavior: 'smooth' //if you want smooth scrolling
	// 	})
	// }
	const leftScroll = () => {
		var container = document.getElementById('container')
		var containerScrollPosition = document.getElementById('container').scrollLeft
		container.scrollTo({
			top: 0,
			left: containerScrollPosition - 300,
			behavior: 'smooth' //if you want smooth scrolling
		})	
	}
	const rightScroll = () => {
		var container = document.getElementById('container')
		var containerScrollPosition = document.getElementById('container').scrollLeft
		container.scrollTo({
			top: 0,
			left: containerScrollPosition + 300,
			behavior: 'smooth' //if you want smooth scrolling
		})	
	}
	return (
		<>
		<div
			className="absolute top-0 left-auto w-full mt-48 scrolling-touch md:w-1/2 scroll-parent lg:w-1/2"
			// flex w-1/5 overflow-x-hidden scrolling-touch h-600"
			id="container">
		
			{currText.map((item, index) => {
				return (
					<div
						className="flex flex-col items-center justify-start font-serif text-lg font-medium leading-9 text-red-900 scroll-child"
						// h-full  w-96 "
						key={index}
						onWheel={onWheelTwo}
					>
						{addLineBreaks(item, index)}
					</div>
				)
			})}
		</div>
		
		<div className="absolute top-0 right-auto justify-end hidden w-20 h-64 mt-48 -ml-64 text-sm text-red-800 opacity-50 cursor-pointer select-none md:flex md:items-center" onClick={leftScroll}>&#10094;</div>
		<div className="absolute top-0 right-auto hidden w-20 h-64 mt-48 ml-56 text-sm text-red-800 opacity-50 cursor-pointer select-none md:flex md:items-center" onClick={rightScroll}>&#10095;
</div>
		</>
	)
}

export default App
