import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { getProductDetailsByIdAPI } from '../../apis/common';
import ListImageViewProduct from '../ListImageViewProduct';
import './style.css'


export const loader = async ({ params }) => {
    return { 'productId': params.productId };
}

function StoreViewForUserGridProduct() {

    const [isClosing, setIsClosing] = useState(false);
    const { productId } = useLoaderData();
    const [product, setProducts] = useState(null);
    const location = useLocation();
    let prevLink = location.pathname.toLowerCase().split(`/grid`)[0]+"/grid"
    console.log("Prev link: ", prevLink);
    const history = useNavigate();
    const onClosing = () => {
        setIsClosing(true);
        setTimeout(() => {
            history(prevLink);
        }, 500)
    }

    const fetchProduct = async () => {
        await getProductDetailsByIdAPI(productId).then(res => {
            setProducts(res.data.product);
        }).catch(err => { toast.error(err.message); history(prevLink); });
    }

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={'StoreViewForUserGridProduct ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
            <div className={'StoreViewForUserGridProduct-inner ' + (isClosing ? "global-closing-animation" : "global-opening-animation")} >
                <p className='StoreViewForUserGridProduct-inner-close-button' onClick={onClosing} >X</p>
                {!product ?
                    <div className='StoreViewForUserGridProduct-inner-loading' >
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "100px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "200px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "300px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "100px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "300px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "100px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "200px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "300px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "100px"}}></div>
                        <div className='global-sentence-loader StoreViewForUserGridProduct-inner-loading-load' style={{width: "300px"}}></div>
                    </div>
                    :
                    <div>
                        {!!product && <ListImageViewProduct
                            product={product}
                            cardMargin='0px'
                            hasCardInCard={true}
                        />}
                    </div>}
            </div>
        </div>
    )
}

export default StoreViewForUserGridProduct