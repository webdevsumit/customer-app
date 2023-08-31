import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './style.css';

const storeId = localStorage.getItem("storeId");

function UserMenu() {

    const [t, ] = useTranslation('userMenu');

    return (
        <div className='UserMenu'>
            <Link to={`/${storeId}/menu/account-settings`} >{t("links.account")}</Link>
            <Link to={`/${storeId}/menu/liked-products`} >Saved Items</Link>
            <Link to={`/${storeId}/menu/previous-orders`} >{t("links.previous-orders")}</Link>
            <Link to={`/${storeId}/menu/customer-service`} >{t("links.cs")}</Link>
            <Link to={`/${storeId}/sign-out`} >{t("links.signout")}</Link>
        </div>
    )
}

export default UserMenu