import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function UserNavbar({
	bgColor = 'var(--user-primary)'
}) {
	return (
		<div className='UserNavbar' style={{ backgroundColor: bgColor }}>
			<NavLink to='/' className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/homeWhite2.svg' alt='home' />
			</NavLink>
			<NavLink to='/explore/stores' className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/exploreWhite.svg' alt='explore' />
			</NavLink>
			<NavLink to='/notifications' className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/bellWhite.svg' alt='notifications' />
			</NavLink>
			<NavLink to='/bag' className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/bagWhite.svg' alt='bag' />
			</NavLink>
			<NavLink to='/menu' className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/menuWhite.svg' alt='menu' />
			</NavLink>
		</div>
	)
}

export default UserNavbar