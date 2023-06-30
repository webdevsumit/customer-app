import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getProductsForStoreViewByIdAPI, getStoreDetailsByIdAPI } from '../../apis/common';
import { getProductsForTictagStoreViewByIdAPI } from '../../apis/tictag';
import { setCurrentStoreInfoId, setCurrentUserProfileId, setIsCurrentStoreManagedByTicTag } from '../../redux/navbar';
import ListImageViewProduct from '../ListImageViewProduct';
import './style.css';

export const loader = async ({ params }) => {
    let data = null;
    await getStoreDetailsByIdAPI(params.storeId).then(res=>{
        data = res.data.data;
    }).catch(err => toast.error(err.message));
    if(!!data){
        localStorage.setItem('currentStoreCurrency', data.currency);
        localStorage.setItem('currentStoreDateFormat', data.dateFormat);
        localStorage.setItem('isIntegratedAndManagedByTictag', data.isIntegratedAndManagedByTictag);
        return { "storeDetails": data, 'storeId': params.storeId };
    }
    return redirect("/explore/stores");
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function StoreViewForUser() {
    const { storeDetails, storeId } = useLoaderData();
    const [t, ] = useTranslation('exploreStores');
    const dispatch = useDispatch()
    dispatch(setIsCurrentStoreManagedByTicTag(storeDetails.isIntegratedAndManagedByTictag));
    if(storeDetails.isIntegratedAndManagedByTictag){
        dispatch(setCurrentStoreInfoId(storeDetails.storeInfoIdOnTicTag));
        dispatch(setCurrentUserProfileId(storeDetails.userProfileId));
    }

	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalProducts, setTotalProducts] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

	const fetchProducts = async () => {
		setPendingCall(true);
		await getProductsForStoreViewByIdAPI(storeId, globalPageNum, "LIST").then(res => {
			if (res.data.status === 'success') {
				setProducts(renderedProducts => [...renderedProducts, ...res.data.products]);
				setCaughtAll(res.data.caughtAll);
				setTotalProducts(res.data.products_count);
			}
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
	}

	const fetchProductsFromTictag = async () => {
		setPendingCall(true);
		await getProductsForTictagStoreViewByIdAPI(storeDetails.id, globalPageNum, "LIST", storeDetails.storeInfoIdOnTicTag, storeDetails.userProfileId).then(res => {
			if (res.data.status === 'success') {
				setProducts(renderedProducts => [...renderedProducts, ...res.data.products]);
				setCaughtAll(res.data.caughtAll);
				setTotalProducts(res.data.products_count);
			}
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
	}
	
	const isBottom = (el) => {
        // value of the difference is also positive becuase of extra div that we have under navbar
        return window.innerHeight - el.getBoundingClientRect().bottom >= -bottomScrollGapInPixels;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('allMyFavStoresProductsInList_element');
        if (isBottom(wrappedElement) && !globelCaughtAll && !globelPendingCall) {
            // fetchProducts();
            setPage(globalPageNum + 1);
            // document.removeEventListener('scroll', trackScrolling);
        }
    };

	useEffect(() => {
		document.addEventListener('scroll', trackScrolling);
		return(()=>{
			document.removeEventListener('scroll', trackScrolling);
            globelCaughtAll = false;
            globelPendingCall = false;
            globalPageNum = 1;
		})
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
        globelCaughtAll = caughtAll;
        globelPendingCall = pendingCall;
        // eslint-disable-next-line
    }, [caughtAll, pendingCall])

	useEffect(() => {
		globalPageNum = page;
        if(storeDetails.isIntegratedAndManagedByTictag){
            fetchProductsFromTictag();
        }else{
            fetchProducts();
        }
        // eslint-disable-next-line
    }, [page])

    return (
        <div className='StoreViewForUser'>
            <div>
                <h4 className='StoreViewForUser-TotalresultNum'>{t("totol-results")} {totalProducts}</h4>
				<Link to={`/${storeId}/grid`} className='StoreViewForUser-view-wrapper' >
					<img src='/assets/icons/svgs/gridWhite.svg' alt='Filter' />
				</Link>
            </div>
            <div id='allMyFavStoresProductsInList_element'>
				<div className='StoreViewForUser-gridView'>
					{products.map((product, index)=><ListImageViewProduct 
                        key={index} 
                        product={product} 
                        isCurrentStoreManagedByTicTag={storeDetails.isIntegratedAndManagedByTictag}
                        currentUserProfileId={storeDetails.userProfileId}
                        currentStoreInfoId={storeDetails.storeInfoIdOnTicTag}
                    />)}
				</div>
            </div>
            {!caughtAll && <><div className='StoreViewForUser-Loading-more'><p>{t("loading")}</p></div></>}
        </div>
    )
}

export default StoreViewForUser