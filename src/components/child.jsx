import React, { useEffect, useState } from 'react'
import { dhp } from '../dhp-1'
import '../App.css'
import { Link, useParams, Redirect, useLocation, useHistory, Route } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'

export default function Child(props) {
	let { id } = useParams()
	let location = useLocation()
	let currText = dhp[id]
	let initVersePos = parseInt(currText[1][0])
	const [arrow, setArrow] = useState()
	const history = useHistory()
	let chapterName = currText[0]
	const handlers = useSwipeable({ 
		onSwipedRight: () => setArrow(() => 'ArrowLeft'),
		onSwipedLeft: () => setArrow(() => 'ArrowRight'),
	 })
	function addLineBreaks(arr, i) {
		return arr.slice(1, arr.length).map((item, index) => {
			let ex = 'w-full'
			let clas = item[0] + ' ' + ex
			return <div className={clas}>{item[1]}</div>
		})
	}


	useEffect(() => {
		window.addEventListener('keydown', keyPress);
		return () => {
			window.removeEventListener('keydown', keyPress);
		};
	}, []);
	function keyPress(e) {
		if(e.key === 'ArrowRight') {
			setArrow(() => 'ArrowRight')
		} else if (e.key === 'ArrowLeft') {
			setArrow(() => 'ArrowLeft')
		}
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
	console.log(location.pathname)
	return (
		<div className="flex flex-col items-center" onKeyDown={keyPress} {...handlers}>
			<ScrollResetOnMount />
			{location.pathname === `/${id}` && <Redirect from={`/${id}`} to={`/${id}/${initVersePos}`} />}
			<div className="pt-12 -mt-1 font-serif text-base text-red-900 cursor-pointer" onClick={props.click}>
				&#9662;{props.title && `Chapter ${id}: ${chapterName}`}
			</div>
			<div
				className="justify-start w-full mt-2 scrolling-touch rounded-lg md:w-1/2 scroll-parent lg:w-1/2"
				id="container"
			>
				{currText &&
					currText.slice(1, currText.length).map((item, index) => {
			
	 	
						let firstItem = initVersePos
						let lastItem = parseInt(currText.slice(-1)[0][0])

						const onWheelTwo = (e) => {
							if (e.deltaY !== 0) {
								e.preventDefault()
								e.stopPropagation()
								var scrollX = scrollJack(e.deltaX, e.deltaY)
								document.getElementById('container').scrollBy(scrollX, 0)
								if (e.deltaY > 0 && item[0] < lastItem) {
									history.push(`./${parseInt(item[0]) + 1}`)
								} else if (e.deltaY < 0 && item[0] > firstItem) {
									history.push(`./${parseInt(item[0]) - 1}`)
								}
							}
						}
						const scrollJack = (dx, dy) => (dy + dx > 0 ? 1 : -1)

						

						return (
							<Route path={`/${id}/${item[0]}`}>
							{arrow === 'ArrowRight' && item[0] < lastItem ? <Redirect to={`./${parseInt(item[0]) + 1}`} /> : null}
							{arrow === 'ArrowLeft' && item[0] > firstItem ? <Redirect to={`./${parseInt(item[0]) - 1}`} /> : null}

								<div
									className="flex flex-col items-center justify-start scrolling-touch font-serif font-medium leading-9 text-red-900 scroll-child"
									key={index}
									onWheel={onWheelTwo}
								>
									<div className="pb-2 opacity-75">{item[0]}</div>

									{addLineBreaks(item, index)}
									{location.pathname === "/1/1" ?
									""
									:
									(item[0] > firstItem ? (
										<Link
											className="absolute top-0 flex items-center justify-start w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none md:text-base left-4 md:left-20 h-80 mt-72 lg:left-80"
											to={`./${parseInt(item[0]) - 1}`}
										>
											&#10094;
										</Link>
									) : (
										<Link
											className="absolute top-0 flex items-center justify-start w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none md:text-base left-4 md:left-20 h-80 mt-72 lg:left-80"
											to={`/${parseInt(id) - 1}`}
										>
											previous
										</Link>
									))}
									{item[0] < lastItem ? (
										<Link
											className="absolute top-0 flex items-center justify-end w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none md:text-base right-4 h-80 mt-72 lg:right-80 md:right-20"
											to={`./${parseInt(item[0]) + 1}`}
										>
											&#10095;
										</Link>
									) : (
										<Link
											className="absolute top-0 flex items-center justify-end w-12 text-xs text-red-800 opacity-50 cursor-pointer select-none md:text-base right-4 h-80 mt-72 lg:right-80 md:right-20"
											to={`/${parseInt(id) + 1}`}
										>
											next
										</Link>
									)}
								</div>
							</Route>
						)
					})}
			</div>

			<div className="flex font-serif text-sm text-red-900 lowercase opacity-50">
				{id > 1 && (
					<Link to={`/${parseInt(id) - 1}`} className="mt-px mr-2 text-xs">
					&#10094;
					</Link>
				)}&nbsp;chapter&nbsp;
				{id < 23 && (
					<Link to={`/${parseInt(id) + 1}`} className="mt-px ml-2 text-xs">
					&#10095;
					</Link>
				)}
			</div>
		</div>
	)
}
