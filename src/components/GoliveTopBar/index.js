import React from 'react';
// import { NavLink } from 'react-router-dom';
import './style.css';

function GoliveTopBar({
	bgColor = 'var(--user-primary)',
}) {
	let logo = localStorage.getItem('store_logo');
    if(!logo || logo === "null") logo ="/assets/svgs/logo.svg";

	return (
		<div className='GoliveTopBar' style={{ backgroundColor: bgColor }}>
			<img className='GoliveTopBar-logo' src={logo} alt='logo' />
		</div>
	)
}

export default GoliveTopBar