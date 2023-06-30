import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './style.css';

function UserMenu() {

    const [t, ] = useTranslation('userMenu');
    let is_store_owner = localStorage.getItem('is_store_owner');

    return (
        <div className='UserMenu'>
            <Link to='/menu/account-settings' >{t("links.account")}</Link>
            <Link to='/menu/general-settings' >{t("links.settings")}</Link>
            <Link to='/menu/previous-orders' >{t("links.previous-orders")}</Link>
            
            {!!is_store_owner && is_store_owner==='true'?
                <Link to='/my-store/orders' >{t("links.admin.switch")} <b>{t("links.admin.bold")}</b></Link>
            :
                <Link to='/create-store' ><b>{t("links.create-store")}</b></Link>
            }
            
            <Link to='/customer-service' >{t("links.cs")}</Link>
            <Link to='/sign-out' >{t("links.signout")}</Link>
        </div>
    )
}

export default UserMenu