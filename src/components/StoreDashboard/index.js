import React from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData } from 'react-router-dom';
import { getDashboardDataAPI } from '../../apis/common';
import DashboardCard from '../commons/DashboardCard';
import NormalLineChart from '../commons/NormalLineChart';
import './style.css';
import { currencyConverter } from '../../actions/commons';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if (!currentStoreCurrency) currentStoreCurrency = 'R$';

export const loader = async () => {
    let data = null;
    await getDashboardDataAPI().then(res=>{
        if(res.data.status === 'success'){
            data = res.data.data;
        }else toast.error(res.data.error[language]);
    }).catch(err=>toast.error(err.message));
    if(!!data) return {data};
    return redirect('/my-store/notifications');
}

function StoreDashboard() {

    const { data } = useLoaderData();
    const [t, ] = useTranslation('storeDashboard');

    return (
        <div className='StoreDashboard'>
            <div className='StoreDashboard-inline'>
                <DashboardCard icon='/assets/icons/svgs/dashboard/bag.svg' value={data.productsOnSale} name={t('productsOnSale')} />
                <DashboardCard icon='/assets/icons/svgs/dashboard/eye.svg' value={data.storeViews} name={t('storeViews')} />
            </div>
            <div className='StoreDashboard-inline'>
                <DashboardCard icon='/assets/icons/svgs/dashboard/twoPeople.svg' value={data.client_count} name={t('clients')} />
                <DashboardCard icon='/assets/icons/svgs/dashboard/heart-outline.svg' value={data.total_products_likes} name={t('favoriteProducts')} />
            </div>
            <div className='StoreDashboard-graph'>
                <h5>{t("graph-head")}</h5>
                <NormalLineChart formatedData={data.monthlySales} />
            </div>
            <div className='StoreDashboard-inline'>
                <DashboardCard icon='/assets/icons/svgs/dashboard/cart.svg' value={data.incomeOfTheMonth} name={t('incomeOfTheMonth')} />
                <DashboardCard icon='/assets/icons/svgs/dashboard/cart.svg' value={data.yesterdaysIncome} name={t('yesterdaysIncome')} />
            </div>
            <div className='StoreDashboard-inline'>
                <DashboardCard icon='/assets/icons/svgs/dashboard/money.svg' currentStoreCurrency={currentStoreCurrency} value={`${currencyConverter(data.total_earned_money_in_cent/100)}`} name={t('totalAvailableBalance')} />
                <DashboardCard icon='/assets/icons/svgs/dashboard/moneyCheck.svg' currentStoreCurrency={currentStoreCurrency} value={`${currencyConverter(data.withdrawal_balance_in_cent/100)}`} name={t('withdrawalBalance')} />
            </div>
        </div>
    )
}

export default StoreDashboard