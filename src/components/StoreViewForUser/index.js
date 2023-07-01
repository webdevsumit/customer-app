import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getProductsForStoreViewByIdAPI } from '../../apis/common';
import ListImageViewProduct from '../ListImageViewProduct';
import './style.css';

export const loader = async ({ params }) => {
    return { 'storeId': params.storeId };
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function StoreViewForUser() {
    const { storeId } = useLoaderData();
    const [t, ] = useTranslation('exploreStores');

	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalProducts, setTotalProducts] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

	const fetchProducts = async () => {
		setPendingCall(true);
		await getProductsForStoreViewByIdAPI(storeId, globalPageNum, "LIST").then(res => {
            setProducts(renderedProducts => [...renderedProducts, ...res.data.products]);
            setCaughtAll(res.data.caughtAll);
            setTotalProducts(res.data.products_count);
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
	}
	
	const isBottom = (el) => {
        return window.innerHeight - el.getBoundingClientRect().bottom >= -bottomScrollGapInPixels;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('allStoresProductsInList_element');
        if (isBottom(wrappedElement) && !globelCaughtAll && !globelPendingCall) {
            setPage(globalPageNum + 1);
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
        fetchProducts();
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
            <div id='allStoresProductsInList_element'>
				<div className='StoreViewForUser-gridView'>
					{products.map((product, index)=><ListImageViewProduct 
                        key={index} 
                        product={product}
                    />)}
				</div>
            </div>
            {!caughtAll && <><div className='StoreViewForUser-Loading-more'><p>{t("loading")}</p></div></>}
        </div>
    )
}

export default StoreViewForUser