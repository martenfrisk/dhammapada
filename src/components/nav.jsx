import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import lotus from '../img/lotus-yellow.svg'
import useHover from './utils'

const Navigation = () => {
	const [ref, hovered ] = useHover()
	let location = useLocation()
	let lotusVis
	location.pathname === "/dhammapada/" || location.pathname === "/dhammapada" ? lotusVis = "invisible inline-block" : lotusVis = "visible inline-block"
	return (
		<div className="flex flex-col items-center justify-center w-full mt-4 font-serif text-red-900"
		ref={ref}>
			<Link to="/dhammapada/" className={lotusVis}>
				<img src={lotus} className="w-6 h-6 select-none" alt="Return to homepage" />
			</Link>
			<div className="select-none">
				Chapters
			</div>
			{hovered &&
				<div ref={ref} className="absolute left-auto flex flex-col px-2 py-3 ml-20 bg-orange-100 rounded-md top-8">
					<Link to="/dhammapada/1/1" ref={ref} className="inline-block text-sm text-red-900">
						Chapter 1
					</Link>
					<Link to="/dhammapada/2/21" ref={ref} className="inline-block text-sm text-red-900 ">
						Chapter 2
					</Link>
					<Link to="/dhammapada/3" ref={ref} className="inline-block text-sm text-red-900 ">
						Chapter 3
					</Link>
				</div>
			}
		</div>
	)
}

export default Navigation
