import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './style.css';

function UserSidebar() {

	let is_store_owner = localStorage.getItem('is_store_owner');
	const [t, ] = useTranslation('userSidebar');

	return (
		<div className='UserSidebar'>
			<NavLink to='/' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/homeWhite2.svg' alt='home' />
					{t("links.HOME")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/explore/stores' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/exploreWhite.svg' alt='explore' />
					{t("links.EXPLORE")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/notifications' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/bellWhite.svg' alt='notifications' />
					{t("links.NOTIFICATIONS")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/bag' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/bagWhite.svg' alt='bag' />
					{t("links.BAG")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/menu/account-settings' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/accounts.svg' alt='account-settings' />
					{t("links.ACCOUNT")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/menu/general-settings' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/settings.svg' alt='general-settings' />
					{t("links.SETTINGS")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/menu/previous-orders' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/orders.svg' alt='orders' />
					{t("links.ORDERS")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>

			{!!is_store_owner && is_store_owner==='true'?
				<NavLink to='/my-store/orders' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
					<img className='UserSidebar-icon' src='/assets/icons/svgs/store.svg' alt='dashboard' />
						{t("links.STORE-MODE")}
					<h6 className='UserSidebar-custom-active-button'>:)</h6>
				</NavLink>
            :
				<NavLink to='/create-store' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
					<img className='UserSidebar-icon' src='/assets/icons/svgs/storeEdit.svg' alt='create-store' />
						{t("links.CREATE-STORE")}
					<h6 className='UserSidebar-custom-active-button'>:)</h6>
				</NavLink>
            }
			<NavLink to='/customer-service' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/customerCare.svg' alt='customerCare' />
					{t("links.CUSTOMER-SERVICE")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
			<NavLink to='/sign-out' className={({ isActive, isPending }) => isActive ? "UserSidebar-active": isPending ? "UserSidebar-pending" : ""}>
				<img className='UserSidebar-icon' src='/assets/icons/svgs/signout.svg' alt='signout' />
					{t("links.SIGN-OUT")}
				<h6 className='UserSidebar-custom-active-button'>:)</h6>
			</NavLink>
		</div>
	)
}

export default UserSidebar;