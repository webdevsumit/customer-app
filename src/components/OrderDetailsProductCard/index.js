import React from 'react';
import { Link } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import './style.css';

let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if (!currentStoreCurrency) currentStoreCurrency = 'R$';

function OrderDetailsProductCard({ product, onStore=false }) {

    const productName = product.isProductOnTicTag ? product.productOnTicTag.name: product.product.name;
    const store_unique_id = product.isProductOnTicTag ? product.productOnTicTag.store_unique_id: product.product.store_unique_id;
    const product_id = product.isProductOnTicTag ? product.productOnTicTag.idOnTicTag: product.product.id;

    return (
        <div className='OrderDetailsProductCard'>
            <div className='OrderDetailsProductCard-desc'>
                <p>{productName}</p>
                <div className='OrderDetailsProductCard-more-btn-div'>
                    {store_unique_id && 
                        <Link className='OrderDetailsProductCard-more-btn' to={`/${store_unique_id}/grid/${product_id}/`}>know more</Link>
                    }
                </div>
            </div>
            <div className='OrderDetailsProductCard-details-price-div'>
                <h5 className='OrderDetailsProductCard-details-price' style={{color: `${onStore ? 'var(--store-primary)' : 'var(--user-primary)'}`}}>{currentStoreCurrency}: {currencyConverter(product.final_price_in_cent / 100, currentStoreCurrency)}</h5>
                <h5 className='OrderDetailsProductCard-details-price' style={{color: `${onStore ? 'var(--store-primary)' : 'var(--user-primary)'}`}}>X{product.quantity}</h5>
                <h5 className='OrderDetailsProductCard-details-price' style={{color: `${onStore ? 'var(--store-primary)' : 'var(--user-primary)'}`}}>{currentStoreCurrency}: {currencyConverter((product.final_price_in_cent*product.quantity) / 100, currentStoreCurrency)}</h5>
            </div>
        </div>
    )
}

export default OrderDetailsProductCard