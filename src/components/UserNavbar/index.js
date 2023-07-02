import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const storeId = localStorage.getItem("storeId");

function UserNavbar({
	bgColor = 'var(--user-primary)'
}) {

	return (
		<div className='UserNavbar' style={{ backgroundColor: bgColor }}>
			<NavLink to={`/${storeId}/list`} className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/homeWhite2.svg' alt='home' />
			</NavLink>
			<NavLink to={`/${storeId}/search`} className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/pngs/search.png' alt='search' />
			</NavLink>
			<NavLink to={`/${storeId}/notifications`} className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/bellWhite.svg' alt='notifications' />
			</NavLink>
			<NavLink to={`/${storeId}/bag`} className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/bagWhite.svg' alt='bag' />
			</NavLink>
			<NavLink to={`/${storeId}/menu`} className={({ isActive, isPending }) => isActive ? "UserNavbar-active": isPending ? "UserNavbar-pending" : ""}>
				<img className='UserNavbar-icon' src='/assets/icons/svgs/menuWhite.svg' alt='menu' />
			</NavLink>
		</div>
	)
}

export default UserNavbar