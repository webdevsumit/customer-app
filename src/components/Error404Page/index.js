import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Error404Page() {
	return (
		<div className=''>
			<div className='Error404Page'>
				<h1>404</h1>
				<h2>Page Not Found</h2>
				<Link to='/'>Go Back To Home</Link>
			</div>
		</div>
	)
}

export default Error404Page