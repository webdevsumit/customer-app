import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function StoreNavbar({
	bgColor = 'var(--store-primary)'
}) {
	return (
		<div className='StoreNavbar' style={{ backgroundColor: bgColor }}>
			<NavLink to='/my-store/dashboard' className={({ isActive, isPending }) => isActive ? "StoreNavbar-active": isPending ? "StoreNavbar-pending" : ""}>
				<img className='StoreNavbar-icon' src='/assets/icons/svgs/homeWhite2.svg' alt='home' />
			</NavLink>
			<NavLink to='/my-store/import-products' className={({ isActive, isPending }) => isActive ? "StoreNavbar-active": isPending ? "StoreNavbar-pending" : ""}>
				<img className='StoreNavbar-icon' src='/assets/icons/svgs/excelsheetWhite2.svg' alt='import' />
			</NavLink>
			<NavLink to='/my-store/notifications' className={({ isActive, isPending }) => isActive ? "StoreNavbar-active": isPending ? "StoreNavbar-pending" : ""}>
				<img className='StoreNavbar-icon' src='/assets/icons/svgs/bellWhite2.svg' alt='notifications' />
			</NavLink>
			<NavLink to='/my-store/orders' className={({ isActive, isPending }) => isActive ? "StoreNavbar-active": isPending ? "StoreNavbar-pending" : ""}>
				<img className='StoreNavbar-icon' src='/assets/icons/svgs/orders.svg' alt='orders' />
			</NavLink>
			<NavLink to='/my-store/balance' className={({ isActive, isPending }) => isActive ? "StoreNavbar-active": isPending ? "StoreNavbar-pending" : ""}>
				<img className='StoreNavbar-icon' src='/assets/icons/svgs/cashTickWhite2.svg' alt='cash' />
			</NavLink>
			<NavLink to='/my-store/menu' className={({ isActive, isPending }) => isActive ? "StoreNavbar-active": isPending ? "StoreNavbar-pending" : ""}>
				<img className='StoreNavbar-icon' src='/assets/icons/svgs/menuWhite.svg' alt='menu' />
			</NavLink>
		</div>
	)
}

export default StoreNavbar