import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { getCanAddMoreProductsAPI } from '../../../apis/common';
import { tictagUrl } from '../../../apis/tictag';
import './style.css';

export const loader = async () => {
    let can_add_more_products = false;
    let hasLimitLessThanFive = false;
    let isAddressAddedInStore = false;
    let isIntegratedAndManagedByTictag = false;
    await getCanAddMoreProductsAPI().then(res => {
        if (res.data.status === 'success') {
            can_add_more_products = res.data.can_add_more_products;
            hasLimitLessThanFive = res.data.hasLimitLessThanFive;
            isAddressAddedInStore = res.data.isAddressAddedInStore;
            isIntegratedAndManagedByTictag = res.data.isIntegratedAndManagedByTictag;
        }
    }).catch(err => toast.error(err.message));
    return { 'can_add_more_products': can_add_more_products, "hasLimitLessThanFive": hasLimitLessThanFive, 'isAddressAddedInStore': isAddressAddedInStore, "isIntegratedAndManagedByTictag": isIntegratedAndManagedByTictag };
}

function ImportProducts() {

    const { can_add_more_products, hasLimitLessThanFive, isAddressAddedInStore, isIntegratedAndManagedByTictag } = useLoaderData();
    const [limitLT5, setLimitLT5] = useState(hasLimitLessThanFive);

    const [t, ] = useTranslation('importProducts');

    const [isClosing, setIsClosing] = useState(false);
    const onClosing = () => {
        setIsClosing(true);
        setTimeout(() => {
            setLimitLT5(false)
        }, 500)
    }

    return (
        <div className='ImportProducts'>
            {isIntegratedAndManagedByTictag && <div className={'ImportProducts-cannot_add_more_products-popup ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
                <div className={'ImportProducts-cannot_add_more_products-popup-div ' + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                    <h4>{t("limitNotce.tictagManagementWarn.notice")}</h4>
                    <p>{t("limitNotce.tictagManagementWarn.p1-line1")}</p>
                    <a target="blank" href={tictagUrl}>{t("limitNotce.tictagManagementWarn.button")}</a>
                </div>
            </div>}
            {!isAddressAddedInStore && <div className={'ImportProducts-cannot_add_more_products-popup ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
                <div className={'ImportProducts-cannot_add_more_products-popup-div ' + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                    <h4>{t("limitNotce.addressWarning.notice")}</h4>
                    <p>{t("limitNotce.addressWarning.p1-line1")} </p>
                    <Link to="/my-store/menu/store-settings">{t("limitNotce.addressWarning.buttonAddAddress")}</Link>
                </div>
            </div>}
            {!can_add_more_products && <div className={'ImportProducts-cannot_add_more_products-popup ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
                <div className={'ImportProducts-cannot_add_more_products-popup-div ' + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                    <h4>{t("limitNotce.notice")}</h4>
                    <p>{t("limitNotce.p1-line1")} <b>{t("limitNotce.p1-hightlight1")}</b>. 
                        {t("limitNotce.p1-line2")} </p>
                    <Link to="/my-store/menu/subscription">{t("limitNotce.buttonCheckPlan")}</Link>
                </div>
            </div>}
            {limitLT5 && <div className={'ImportProducts-cannot_add_more_products-popup ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
                <div className={'ImportProducts-cannot_add_more_products-popup-div ' + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                    <h4>{t("limitNotce.notice")}</h4>
                    <p>{t("limitNotce.p2-line1")} <b>{t("limitNotce.p2-hightlight1")}</b>. 
                    {t("limitNotce.p2-line2")} </p>
                    <div className='ImportProducts-buttons'>
                        <h5 onClick={onClosing} className='ImportProducts-submit-button1'>{t("limitNotce.close")}</h5>
                        <Link to="/my-store/menu/subscription">{t("limitNotce.buttonCheckPlan")}</Link>
                    </div>
                </div>
            </div>}
            <Outlet />
        </div>
    )
}

export default ImportProducts