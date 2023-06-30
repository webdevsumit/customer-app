import React from 'react';
// import { NavLink } from 'react-router-dom';
import './style.css';

function GoliveTopBar({
	bgColor = 'var(--user-primary)',
	showStoreMenu=false
}) {
	return (
		<div className='GoliveTopBar' style={{ backgroundColor: bgColor }}>
			<img className='GoliveTopBar-logo' src='/assets/svgs/logo.svg' alt='logo' />
			{/* {!showStoreMenu?<>
				<div className='GoliveTopBar-bigScreenNavigation'>
					<NavLink to='/' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/homeWhite.svg' alt='HOME' />
						<h5 className='GoliveTopBar-icon-link'>HOME</h5>
					</NavLink>
					<NavLink to='/explore/stores' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/exploreWhite.svg' alt='EXPLORE' />
						<h5 className='GoliveTopBar-icon-link'>EXPLORE</h5>
					</NavLink>
					<NavLink to='/notifications' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/bellWhite.svg' alt='NOTIFICATIONS' />
						<h5 className='GoliveTopBar-icon-link'>NOTIFICATIONS</h5>
					</NavLink>
					<NavLink to='/bag' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/bagWhite.svg' alt='BAG' />
						<h5 className='GoliveTopBar-icon-link'>BAG</h5>
					</NavLink>
					<NavLink to='/menu' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/menuWhite.svg' alt='MENU' />
						<h5 className='GoliveTopBar-icon-link'>MENU</h5>
					</NavLink>
				</div>
			</>:<>
				<div className='GoliveTopBar-bigScreenNavigation'>
					<NavLink to='/my-store/dashboard' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/homeWhite.svg' alt='HOME' />
						<h5 className='GoliveTopBar-icon-link'>HOME</h5>
					</NavLink>
					<NavLink to='/my-store/import-products' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/excelsheetWhite.svg' alt='EXPLORE' />
						<h5 className='GoliveTopBar-icon-link'>EXPLORE</h5>
					</NavLink>
					<NavLink to='/my-store/notifications' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/bellWhite.svg' alt='NOTIFICATIONS' />
						<h5 className='GoliveTopBar-icon-link'>NOTIFICATIONS</h5>
					</NavLink>
					<NavLink to='/my-store/orders' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/bagWhite.svg' alt='ORDERS' />
						<h5 className='GoliveTopBar-icon-link'>ORDERS</h5>
					</NavLink>
					<NavLink to='/my-store/balance' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/cashTickWhite.svg' alt='BALANCE' />
						<h5 className='GoliveTopBar-icon-link'>BALANCE</h5>
					</NavLink>
					<NavLink to='/my-store/menu' className={({ isActive, isPending }) => isActive ? "GoliveTopBar-active": isPending ? "GoliveTopBar-pending" : ""}>
						<img className='GoliveTopBar-icon' src='/assets/icons/svgs/menuWhite.svg' alt='MENU' />
						<h5 className='GoliveTopBar-icon-link'>MENU</h5>
					</NavLink>
				</div>
			</>} */}
		</div>
	)
}

export default GoliveTopBar