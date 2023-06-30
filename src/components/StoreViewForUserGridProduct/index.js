import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { getProductDetailsByIdAPI } from '../../apis/common';
import { getProductDetailsFromTictagByIdAPI } from '../../apis/tictag';
import ListImageViewProduct from '../ListImageViewProduct';
import './style.css'


export const loader = async ({ params }) => {
    return {'productId': params.productId };
}

function StoreViewForUserGridProduct() {

    const { isCurrentStoreManagedByTicTag, currentUserProfileId, currentStoreInfoId } = useSelector(state=>state.navbar);
    const [isClosing, setIsClosing] = useState(false);
    const { productId } = useLoaderData();
    const [product, setProducts] = useState(null);
    const location = useLocation();
    let prevLink = location.pathname.split(`${productId}`)[0]
    const history = useNavigate();
    const onClosing = () => {
        setIsClosing(true);
        setTimeout(() => {
            history(prevLink);
        }, 500)
    }

    const fetchProduct = async () => {
        if(isCurrentStoreManagedByTicTag){
            await getProductDetailsFromTictagByIdAPI(productId, currentStoreInfoId, currentUserProfileId).then(res=>{
                setProducts(res.data.product);
            }).catch(err => {toast.error(err.message); history(prevLink);});
        }else{
            await getProductDetailsByIdAPI(productId).then(res=>{
                setProducts(res.data.product);
            }).catch(err => {toast.error(err.message); history(prevLink);});
        }
    }

    useEffect(()=>{
        fetchProduct();
        // eslint-disable-next-line
    },[]);

    return (
        <div className={'StoreViewForUserGridProduct ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
            <div className={'StoreViewForUserGridProduct-inner ' + (isClosing ? "global-closing-animation" : "global-opening-animation")} >
            <p className='StoreViewForUserGridProduct-inner-close-button' onClick={onClosing} >X</p>
                <div>
                    {!!product && <ListImageViewProduct 
                        product={product} 
                        cardMargin='0px' 
                        hasCardInCard={true} 
                        isCurrentStoreManagedByTicTag={isCurrentStoreManagedByTicTag}
                        currentUserProfileId={currentUserProfileId}
                        currentStoreInfoId={currentStoreInfoId}
                    />}
                </div>
            </div>
        </div>
    )
}

export default StoreViewForUserGridProduct