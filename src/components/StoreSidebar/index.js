import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './style.css';

function StoreSidebar() {

	// let is_store_owner = localStorage.getItem('is_store_owner');
	const [t, ] = useTranslation('storeSidebar');

	return (
		<div className='StoreSidebar'>
			<NavLink to='/my-store/dashboard' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/homeWhite2.svg' alt='home' />
					{t("links.HOME")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/import-products' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/excelsheetWhite2.svg' alt='excelsheetWhite2' />
				 	{t("links.IMPORT")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/notifications' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/bellWhite2.svg' alt='notifications' />
					{t("links.NOTIFICATIONS")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/orders' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/orders.svg' alt='orders' />
					{t("links.ORDERS")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/balance' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/cashTickWhite2.svg' alt='cashTickWhite2' />
					{t("links.BALANCE")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/menu/store-settings' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/storesettings.svg' alt='store-settings' />
					{t("links.STORE-SETTINGS")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/menu/manage-products' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/pngs/holding-box.png' alt='manage-products' />
					{t("links.MANAGE-PRODUCTS")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/menu/general-settings' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/settings.svg' alt='general-settings' />
					{t("links.SETTINGS")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/my-store/menu/subscription' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/subscription.svg' alt='general-settings' />
					{t("links.SUBSCRIPTION", {"type": "FREE"})}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/usersMode.svg' alt='usersMode' />
					{t("links.USER-MODE")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/customer-service' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/customerCare.svg' alt='customerCare' />
					{t("links.CUSTOMER-SERVICE")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/sign-out' className={({ isActive, isPending }) => isActive ? "StoreSidebar-active": isPending ? "StoreSidebar-pending" : ""}>
				<img className='StoreSidebar-icon' src='/assets/icons/svgs/signout.svg' alt='signout' />
					{t("links.SIGN-OUT")}
				<h6 className='StoreSidebar-custom-active-button'>:)</h6>
			</NavLink>
		</div>
	)
}

export default StoreSidebar;