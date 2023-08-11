import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getProductsForStoreViewByIdAPI, getProductsForStoreViewByIdAndSearchAPI } from '../../apis/common';
import ListImageViewProduct from '../ListImageViewProduct';
import PullToRefresh from 'react-simple-pull-to-refresh';
import './style.css';
import { useSelector } from 'react-redux';

export const loader = async ({ params }) => {
    return { 'storeId': params.storeId };
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function StoreViewForUser({ fromSearch = false }) {
    const { storeId } = useLoaderData();
    const [t,] = useTranslation('exploreStores');
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(globalPageNum);
    const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
    const [totalProducts, setTotalProducts] = useState(0);
    const [pendingCall, setPendingCall] = useState(globelPendingCall);

    let { searchedText } = useSelector(state => state.navbar);
    if (!searchedText) searchedText = localStorage.getItem("searchedText");
    if (!searchedText && fromSearch) navigate(`/${storeId}/search`);

    const productsAPIToCall = fromSearch ? getProductsForStoreViewByIdAndSearchAPI : getProductsForStoreViewByIdAPI;
    const fetchProducts = async () => {
        setPendingCall(true);
        await productsAPIToCall(storeId, globalPageNum, "LIST", { searchedText }).then(res => {
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
        return (() => {
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
        <div className='StoreViewForUser'>
            <div>
                <h4 className='StoreViewForUser-TotalresultNum'>
                    {t("totol-results")} {totalProducts}
                    {fromSearch && <p className='StoreViewForUser-searchedTextP'>Q: <i>{searchedText}</i></p>}
                </h4>
                <Link to={`/${storeId}${fromSearch ? "/search" : ""}/grid`} className='StoreViewForUser-view-wrapper' >
                    <img src='/assets/icons/svgs/gridWhite.svg' alt='Filter' />
                </Link>
            </div>

            <PullToRefresh onRefresh={handleRefresh}>
                <div id='allStoresProductsInList_element'>
                    <div className='StoreViewForUser-gridView'>
                        {products.map((product, index) => <ListImageViewProduct
                            key={index}
                            product={product}
                        />)}
                    </div>
                </div>
                {!caughtAll && <><div className='StoreViewForUser-Loading-more'><p>{t("loading")}</p></div></>}
            </PullToRefresh>
        </div>
    )
}

export default StoreViewForUser