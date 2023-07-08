import React from 'react';
import { Link } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import './style.css';

let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if (!currentStoreCurrency) currentStoreCurrency = 'R$';
let storeId = localStorage.getItem("storeId");

function OrderDetailsProductCard({ product }) {

    return (
        <div className='OrderDetailsProductCard'>
            <div className='OrderDetailsProductCard-desc'>
                <p>{product.product.name}</p>
                <div className='OrderDetailsProductCard-more-btn-div'>
                    {!!storeId && 
                        <Link className='OrderDetailsProductCard-more-btn' to={`/${storeId}/grid/${product.product.id}/`}>Product Details</Link>
                    }
                </div>
            </div>
            <div className='OrderDetailsProductCard-details-price-div'>
                <h5 className='OrderDetailsProductCard-details-price' style={{color: `'var(--user-primary)`}}>{currentStoreCurrency}: {currencyConverter(product.final_price_in_paisa / 100, currentStoreCurrency)}</h5>
                <h5 className='OrderDetailsProductCard-details-price' style={{color: `'var(--user-primary)`}}>X{product.quantity}</h5>
                <h5 className='OrderDetailsProductCard-details-price' style={{color: `'var(--user-primary)`}}>{currentStoreCurrency}: {currencyConverter((product.final_price_in_paisa*product.quantity) / 100, currentStoreCurrency)}</h5>
            </div>
        </div>
    )
}

export default OrderDetailsProductCard