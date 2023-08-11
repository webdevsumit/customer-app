import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getProductsForStoreViewByIdAPI, getProductsForStoreViewByIdAndSearchAPI } from '../../apis/common';
import GridImageViewProduct from '../GridImageViewProduct';
import './style.css';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';

export const loader = async ({ params }) => {
    return { 'storeId': params.storeId };
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function StoreViewForUserGrid({ fromSearch=false }) {
    const { storeId } = useLoaderData();
    const [t, ] = useTranslation('exploreStores');
    const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalProducts, setTotalProducts] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

    let { searchedText } = useSelector(state=>state.navbar);
    if(!searchedText) searchedText = localStorage.getItem("searchedText");
    if(!searchedText && fromSearch) navigate(`/${storeId}/search`);

    const productsAPIToCall = fromSearch ? getProductsForStoreViewByIdAndSearchAPI : getProductsForStoreViewByIdAPI;
	const fetchProducts = async () => {
		setPendingCall(true);
		await productsAPIToCall(storeId, globalPageNum, 'GRID', {searchedText}).then(res => {
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

    const handleRefresh = async () => {
        let lastPage = page;
        setProducts([]);
        setPage(1);
        if(lastPage===1){
            fetchProducts();
        }
    }

    return (
        <div className='StoreViewForUserGrid'>
            <div>
                <h4 className='StoreViewForUserGrid-TotalresultNum'>
                    {t("totol-results")} {totalProducts}
                    {fromSearch && <p className='StoreViewForUser-searchedTextP'>Q: <i>{searchedText}</i></p>}
                </h4>
				<Link to={`/${storeId}${fromSearch ? "/search" : ""}/list`} className='StoreViewForUserGrid-view-wrapper' >
					<img src='/assets/icons/svgs/listWhite.svg' alt='Filter' />
				</Link>
            </div>

            <PullToRefresh onRefresh={handleRefresh}>
                <div id='allMyFavStoresProductsInGrid_element'>
                    <div className='StoreViewForUserGrid-gridView'>
                        {products.map((product, index)=><GridImageViewProduct key={index} product={product} />)}
                    </div>
                </div>
                {!caughtAll && <><div className='StoreViewForUserGrid-Loading-more'><p>{t("loading")}</p></div></>}
            </PullToRefresh>
            <Outlet />
        </div>
    )
}

export default StoreViewForUserGrid