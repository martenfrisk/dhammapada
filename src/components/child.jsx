import React, { useEffect } from 'react'
import { dhp } from '../dhp-1'
import '../App.css'
import { useParams } from 'react-router-dom'


export default function Child() {
	let { id } = useParams()
	let currText = dhp[id]

	function addLineBreaks(arr, i) {
		let verseNr = i
		verseNr++
		return arr.map((item, index) => {
			let ex = 'w-full'
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

	function ScrollResetOnMount() {
		useEffect(() => {
			let container = document.getElementById('container')
			container.scrollTo({
				top: 0,
				left: 0
			})
		}, [])

		return null
	}

	return (
		<div>
			<ScrollResetOnMount />
			<div
				className="content-center w-full mt-20 scrolling-touch md:w-1/2 scroll-parent lg:w-1/2 hide-scrollbar"
				id="container"
			>
				{currText &&
					currText.map((item, index) => {
						return (
							<div
								className="flex flex-col items-center justify-start font-serif text-lg font-medium leading-9 text-red-900 scroll-child"
								key={index}
								onWheel={onWheelTwo}
							>
								{addLineBreaks(item, index)}
							</div>
						)
					})}
			</div>

			<div
				className="absolute top-0 right-auto justify-start hidden w-12 -ml-4 text-xs text-red-800 opacity-50 cursor-pointer select-none h-80 mt-72 md:flex md:items-center"
				onClick={leftScroll}
			>
				&#10094;
			</div>
			<div
				className="absolute top-0 left-auto justify-end hidden w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none h-80 mt-72 ml-80 md:flex md:items-center"
				onClick={rightScroll}
			>
				&#10095;
			</div>
		</div>
	)
}