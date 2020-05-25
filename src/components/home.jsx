import React from 'react'
import lotus from '../img/lotus.svg'

export default function Home() {
	return (
		<div>
			<div className="flex flex-col items-center self-center w-1/2 mx-auto mt-20 text-2xl text-center">
				<div className="text-3xl font-normal text-red-900">Dhammapada Reader</div>
				<img src={lotus} className="w-16 h-16 mt-16 mb-16 " alt="Lotus flower" />
			</div>
		</div>
	)
}