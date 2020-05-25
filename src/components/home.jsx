import React from 'react'
import lotus from '../img/lotus.svg'
import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<div className="flex flex-col items-center self-center mx-auto mt-20 text-2xl">
			<div className="font-serif text-3xl font-thin font-normal text-red-900">Dhammapada Reader</div>
			<img src={lotus} className="w-16 h-16 mt-16 mb-16 " alt="Lotus flower" />

			<Link to="/1" className="font-serif text-sm text-red-900 lowercase">
				Read chapter one
			</Link>
			<div className="mt-48 text-xs font-light text-red-900 lowercase">sources and copyright information</div>
		</div>
	)
}
