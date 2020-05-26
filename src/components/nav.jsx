import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import buddhabrown from '../img/lotus-color.svg'
import useHover from './utils'

const Navigation = () => {
	const [ref, hovered ] = useHover()
	let location = useLocation()
	let lotusVis
	location.pathname === "/dhammapada" ? lotusVis = "invisible inline-block" : lotusVis = "visible inline-block"
	return (
		<div className="flex flex-col items-center justify-center w-full mt-4 font-serif text-red-900"
		ref={ref}>
			<Link to="/dhammapada" className={lotusVis}>
				<img src={buddhabrown} className="w-6 h-6 select-none" alt="Return to homepage" />
			</Link>
			<div>
				Chapters
			</div>
			{hovered &&
				<div ref={ref} className="absolute left-auto flex flex-col px-4 py-4 ml-32 bg-orange-100 top-5">
					<Link to="/1" ref={ref} className="inline-block text-sm text-red-900">
						Chapter 1
					</Link>
					<Link to="/2" ref={ref} className="inline-block text-sm text-red-900 ">
						Chapter 2
					</Link>
				</div>
			}
		</div>
	)
}

export default Navigation
