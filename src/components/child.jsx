import React, { useEffect, useState } from 'react'
import { dhp } from '../dhp-1'
import '../App.css'
import { Link, useParams, Redirect, useLocation, useHistory, Route } from 'react-router-dom'
// import { useSwipeable } from 'react-swipeable'
// import { useTransition, animated } from 'react-spring'
// import SwipeableViews from 'react-swipeable-views';

export default function Child(props) {
	let { id } = useParams()
	let location = useLocation()
	let currText = dhp[id]
	let initVersePos = parseInt(currText[1][0])
	const [ verse, setVerse ] = useState(initVersePos)
	const [ chapter, setChapter ] = useState(Number(id))
	// const [ arrow, setArrow ] = useState({
	// 	'chapter': id,
	// 	'verse': initVersePos
	// })
	const history = useHistory()
	let chapterName = currText[0]

	function addLineBreaks(arr, i) {
		return arr.slice(1, arr.length).map((item, index) => {
			let clas = item[0] + ' w-auto'
			return (
				<p key={index} className={clas}>
					{item[1]}
				</p>
			)
		})
	}

	useEffect(() => {
		window.addEventListener('keydown', keyPress)
		return () => {
			window.removeEventListener('keydown', keyPress)
		}
	}, [])

	const firstItem = initVersePos

	const lastItem = Number(currText.length - 1)
	console.log(lastItem)
	function keyPress(e) {
		if (e.key === 'ArrowRight') {
			if (verse === lastItem) {
				setVerse((prevState) => prevState + 1)
				setChapter((prevState) => prevState + 1)
			} else {
				setVerse((prevState) => prevState + 1)
			}
			console.log(`Arrow: right, verse: ${verse}`)
		} else if (e.key === 'ArrowLeft') {
			let thisVerse = verse
			if (thisVerse > initVersePos) {
				thisVerse > 1 && setVerse((prevState) => prevState - 1)
			} else {
				thisVerse > 1 && setVerse((prevState) => prevState - 1)
				chapter > 1 && setChapter((prevState) => prevState - 1)
			}
			console.log(`Arrow: left, verse: ${thisVerse}`)
		}
	}

	useEffect(
		() => {
			let location = {
				pathname: `/dhammapada/${chapter}/${verse}`
			}
			history.push(location)
		},
		[ verse, chapter ]
	)

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
		<div className="flex flex-col items-center w-full md:w-2/3" onKeyPressCapture={keyPress}>
			<ScrollResetOnMount />
			{location.pathname === `/dhammapada/${id}` && <Redirect from={`./${id}`} to={`./${id}/${initVersePos}`} />}
			{location.pathname === `/dhammapada/${id}/` && (
				<Redirect from={`/dhammapada/${id}`} to={`/dhammapada/${id}/${initVersePos}`} />
			)}
			<div className="pt-6 mb-4 -mt-1 font-serif text-base text-red-900 cursor-pointer" onClick={props.click}>
				&#9662;&nbsp;{props.title && `${id} - ${chapterName}`}
			</div>
			{props.title && (
				<div className="flex font-serif text-sm text-red-900 lowercase opacity-50 md:bottom-10">
					{id > 1 && (
						<Link to={`/dhammapada/${parseInt(id) - 1}`} className="mt-px mr-2 text-xs">
							&#10094;
						</Link>
					)}&nbsp;chapter&nbsp;
					{id < 23 && (
						<Link to={`/dhammapada/${parseInt(id) + 1}`} className="mt-px ml-2 text-xs">
							&#10095;
						</Link>
					)}
				</div>
			)}

			<div className="justify-start w-full mt-2 scrolling-touch rounded-lg md:w-1/2 scroll-parent" id="container">
				{currText &&
					currText.slice(1, currText.length).map((item, index) => {
						return (
							<Route exact path={`/dhammapada/${id}/${item[0]}`}>
								{/* {arrow === 'ArrowRight' && item[0] < lastItem ? (
									<Redirect to={`./${parseInt(item[0]) + 1}`} />
								) : null}
								{arrow === 'ArrowLeft' && item[0] > firstItem ? (
									<Redirect to={`./${parseInt(item[0]) - 1}`} />
								) : null} */}
								<div
									className="flex flex-wrap items-center justify-center mx-6 mb-4 scrolling-touch font-serif font-medium leading-9 text-red-900 scroll-child"
									key={index}
								>
									<div className="w-full my-6 text-center opacity-75">{item[0]}</div>
									<div className="w-1/6 text-xs text-left text-red-800 opacity-50 cursor-pointer select-none md:text-base">
										{location.pathname === '/dhammapada/1/1' ? (
											''
										) : item[0] > firstItem ? (
											<Link className="h-64 pt-24 select-none" to={`./${parseInt(item[0]) - 1}`}>
												&#10094; {/* < */}
											</Link>
										) : (
											<Link
												className="h-64 pt-24 select-none"
												to={`/dhammapada/${parseInt(id) - 1}`}
											>
												previous
											</Link>
										)}
									</div>

									<div className="w-4/6 text-left ">{addLineBreaks(item, index)}</div>

									<div className="flex items-center justify-end w-1/6 text-xs text-right text-red-800 opacity-50 cursor-pointer select-none md:text-base">
										{item[0] < lastItem ? (
											<Link className="h-64 pt-24 select-none" to={`./${parseInt(item[0]) + 1}`}>
												&#10095; {/* > */}
											</Link>
										) : (
											<Link
												className="h-64 pt-24 select-none"
												to={`/dhammapada/${parseInt(id) + 1}`}
											>
												next
											</Link>
										)}
									</div>
								</div>
							</Route>
						)
					})}
			</div>
		</div>
	)
}
