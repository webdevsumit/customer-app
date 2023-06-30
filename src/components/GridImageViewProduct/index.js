import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function GridImageViewProduct({ product }) {
    const location = useLocation();
    let extraSlace = '';
    if(location.pathname[location.pathname.length-1] !== '/') extraSlace = '/';
    return (
        <div className='GridImageViewProduct'>
            <Link to={`${location.pathname}${extraSlace}${product.id}/`}>
                {!!product.image? <>
                    <img className='GridImageViewProduct-image' src={product.image} alt='product-click' />
                </>:<>
                    <img className='GridImageViewProduct-image' src="/assets/pngs/noPhoto.png" alt='product-click' />
                </>}
            </Link>
        </div>
    )
}

export default GridImageViewProduct