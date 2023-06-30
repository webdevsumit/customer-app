import moment from 'moment';
import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import './style.css'

let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if(!currentStoreCurrency) currentStoreCurrency = 'R$';
let currentStoreDateFormat = localStorage.getItem('currentStoreDateFormat');
if(!!currentStoreDateFormat) currentStoreDateFormat =  'DD/MM/YYYY';
// const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

function PreviousOrdersCard({order, onStore=false}) {

    const [t,] = useTranslation("previousOrdersCard");
    const [orderObj,] = useState(order);

    const location = useLocation();
    let extraSlace = '';
    if(location.pathname[location.pathname.length-1] !== '/') extraSlace = '/';

    return (
        <Link className='PreviousOrdersCard-link' to={`${location.pathname}${extraSlace}${orderObj.id}/`}>
            <div className='PreviousOrdersCard' style={{backgroundColor: `${onStore ? 'var(--store-primary)' : 'var(--user-primary)'}`}}>
                <div className='PreviousOrdersCard-text-div'>
                    <p className='PreviousOrdersCard-text' > {t("orderNo")} {orderObj.order_number}</p>
                    <p className='PreviousOrdersCard-text-date' >{moment(orderObj.createdAt).format(`${currentStoreDateFormat} hh:mm a`)}</p>
                </div>
                <hr/>
                <div className='PreviousOrdersCard-amount-div'>
                    <div className='PreviousOrdersCard-amount-inner-div'>
                        {t("subtotal")}
                        <h5 className='PreviousOrdersCard-text-date'>{currentStoreCurrency}: {currencyConverter(orderObj.subtotal_in_cent/100, currentStoreCurrency)}</h5>
                    </div>
                    <div className='PreviousOrdersCard-amount-inner-div'>
                        {t("deliveryCharge")}
                        <h5 className='PreviousOrdersCard-text-date'>{currentStoreCurrency}: {currencyConverter(orderObj.delievery_charges/100, currentStoreCurrency)}</h5>
                    </div>
                    <div className='PreviousOrdersCard-amount-inner-div'>
                        {t("total")}
                        <h5 className='PreviousOrdersCard-text-date'>{currentStoreCurrency}: {currencyConverter(orderObj.total_in_cent/100, currentStoreCurrency)}</h5>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PreviousOrdersCard