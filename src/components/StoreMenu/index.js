import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style.css';
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function StoreMenu() {

    // let is_store_owner = localStorage.getItem('is_store_owner');
    const location = useLocation();
    let locationList = location.pathname.split('/menu');
    const [t, ] = useTranslation('storeMenu');

    if(locationList.length>1 && locationList[1] !== '' && locationList[1] !== '/')
    return <Outlet />

    return (
        <div className='StoreMenu'>
            <Link to='/my-store/menu/store-settings' >{t("links.storeSettings")}</Link>
            <Link to='/my-store/menu/manage-products' >{t("links.manageProducts")}</Link>
            <Link to='/my-store/menu/general-settings' >{t("links.settings")}</Link>
            <Link to='/my-store/menu/subscription' >{t("links.subscription", {"type": "FREE"})}</Link>
            <Link to='/' >{t("links.userMode.1")} <b>{t("links.userMode.2")}</b></Link>
            <Link to='/customer-service' >{t("links.cs")}</Link>
            <Link to='/sign-out' >{t("links.signout")}</Link>
        </div>
    )
}

export default StoreMenu