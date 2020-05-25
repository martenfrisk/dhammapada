import React, { useEffect } from 'react'
import { dhp } from '../dhp-1'
import '../App.css'
import { Link, useParams } from 'react-router-dom'

export default function Child(props) {
	let { id } = useParams()
	let currText = dhp[id]
	let chapterName = currText[0]
	function addLineBreaks(arr, i) {
		return arr.slice(1, arr.length).map((item, index) => {
			let ex = 'w-full'
			let clas = item[0] + ' ' + ex
			return <div className={clas}>{item[1]}</div>
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
	const scrollJack = (dx, dy) => (dy + dx > 0 ? 1 : -1)

	const leftScroll = () => {
		var container = document.getElementById('container')
		var containerScrollPosition = document.getElementById('container').scrollLeft
		container.scrollTo({
			top: 0,
			left: containerScrollPosition - 300
		})
	}
	const rightScroll = () => {
		var container = document.getElementById('container')
		var containerScrollPosition = document.getElementById('container').scrollLeft
		container.scrollTo({
			top: 0,
			left: containerScrollPosition + 300
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
		<div className="flex flex-col items-center">
			<ScrollResetOnMount />
			<div className="pt-12 -mt-1 font-serif text-base text-red-900 cursor-pointer" onClick={props.click}>&#9662;{props.title && ` ${chapterName}`}</div>
			<div className="justify-start w-full mt-2 scrolling-touch rounded-lg md:w-1/2 scroll-parent lg:w-1/2" id="container">
				{currText &&
					currText.slice(1, currText.length).map((item, index) => {
						return (
							<div
								className="flex flex-col items-center justify-start font-serif font-medium leading-9 text-red-900 scroll-child"
								key={index}
								onWheel={onWheelTwo}
							>
                            <div className="pb-2 opacity-75">
								{item[0]}

                            </div>

								{addLineBreaks(item, index)}
							</div>
						)
					})}
			</div>

			<div
				className="absolute top-0 flex items-center justify-start w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none md:text-base left-4 md:left-20 h-80 mt-72 lg:left-80"
				onClick={leftScroll}
			>
				&#10094;
			</div>
			<div
				className="absolute top-0 flex items-center justify-end w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none md:text-base right-4 h-80 mt-72 lg:right-80 md:right-20"
				onClick={rightScroll}
			>
				&#10095;
			</div>
            <div className="flex">

            {id > 1 &&
            <Link to={`/${parseInt(id) - 1}`} className="mr-2 font-serif text-sm text-red-900 lowercase">Previous</Link>
            }
            {id < 23 &&
            <Link to={`/${parseInt(id) + 1}`} className="ml-2 font-serif text-sm text-red-900 lowercase">Next</Link>
            }
            </div>
		</div>
	)
}
