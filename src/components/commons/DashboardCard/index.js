import React from 'react';
import './style.css';

function DashboardCard({ icon = '/assets/icons/svgs/dashboard/bag.svg', value = 0, name = '-----', currentStoreCurrency=null }) {
    return (
        <div className='DashboardCard'>
            <div className='DashboardCard-inline'>
                <img className='DashboardCard-img' src={icon} alt="icon" />
                <h3 className='DashboardCard-value'>
                    {!!currentStoreCurrency && <span className='DashboardCard-value-currency' >{currentStoreCurrency} </span>}
                    {value}
                </h3>
            </div>
            <p>{name}</p>
        </div>
    )
}

export default DashboardCard