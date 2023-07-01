import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getProductsForStoreViewByIdAPI } from '../../apis/common';
import GridImageViewProduct from '../GridImageViewProduct';
import './style.css';

export const loader = async ({ params }) => {
    return { 'storeId': params.storeId };
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function StoreViewForUserGrid() {
    const { storeId } = useLoaderData();
    const [t, ] = useTranslation('exploreStores');

	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalProducts, setTotalProducts] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

	const fetchProducts = async () => {
		setPendingCall(true);
		await getProductsForStoreViewByIdAPI(storeId, globalPageNum, 'GRID').then(res => {
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
        const wrappedElement = document.getElementById('allMyFavStoresProductsInGrid_element');
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
        fetchProducts();
        // eslint-disable-next-line
    }, [page])

    return (
        <div className='StoreViewForUserGrid'>
            <div>
                <h4 className='StoreViewForUserGrid-TotalresultNum'>{t("totol-results")} {totalProducts}</h4>
				<Link to={`/${storeId}`} className='StoreViewForUserGrid-view-wrapper' >
					<img src='/assets/icons/svgs/listWhite.svg' alt='Filter' />
				</Link>
            </div>
            <div id='allMyFavStoresProductsInGrid_element'>
				<div className='StoreViewForUserGrid-gridView'>
					{products.map((product, index)=><GridImageViewProduct key={index} product={product} />)}
				</div>
            </div>
            {!caughtAll && <><div className='StoreViewForUserGrid-Loading-more'><p>{t("loading")}</p></div></>}
            <Outlet />
        </div>
    )
}

export default StoreViewForUserGrid