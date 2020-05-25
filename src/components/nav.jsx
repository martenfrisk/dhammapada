import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<div className="flex">
			<Link to="/dhammapada" className="inline-block px-6 py-2 mx-2 text-red-900">
				Home
			</Link>
			<Link to="/1" className="inline-block px-6 py-2 mx-2 text-red-900">
				Chapter 1
			</Link>
			<Link to="/2" className="inline-block px-6 py-2 mx-2 text-red-900">
				Chapter 2
			</Link>
		</div>
	)
}

export default Navigation