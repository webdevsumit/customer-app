import React from 'react';
// import { NavLink } from 'react-router-dom';
import './style.css';

function TopBar({
	bgColor = 'var(--user-primary)',
}) {
	let logo = localStorage.getItem('store_logo');
    if(!logo || logo === "null") logo ="/assets/svgs/logo.svg";

	return (
		<div className='TopBar' style={{ backgroundColor: bgColor }}>
			<img className='TopBar-logo' src={logo} alt='logo' />
		</div>
	)
}

export default TopBar