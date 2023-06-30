import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getMyStoreProductsAPI, getStoreFilterOptionsApi } from '../../apis/common';
import ProductFilter from '../commons/ProductFilter';
import PhotoGalleryEditPopup from '../PhotoGalleryEditPopup';
import ProductCardForStore from '../ProductCardForStore';
import './style.css';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async () => {
    let storeId = localStorage.getItem("store_id");
    let categories = null;
    let sortByChoices = null;
    let success = false;
    let isIntegratedAndManagedByTictag = false;
    await getStoreFilterOptionsApi(storeId).then(res => {
        if (res.data.status === "success") {
            categories = res.data.data.categories;
            sortByChoices = res.data.data.sortByChoices;
            isIntegratedAndManagedByTictag = res.data.isIntegratedAndManagedByTictag;
            success = true;
        } else {
            toast.error(res.data.error[language])
        }
    }).catch(err => toast.error(err.message));
    if(isIntegratedAndManagedByTictag) return redirect('/my-store/managedByTicTag')
    if (success) return { 'categories': categories, "sortByChoices": sortByChoices };
    return redirect("/");
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globelOpenFilterBox = true;
var globalPageNum = 1;

function ManageProducts() {

    const [t, ] = useTranslation('manageProducts');
    const { categories, sortByChoices } = useLoaderData();

    const [openFilterBox, setOpenFilterBox] = useState(globelOpenFilterBox);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(globalPageNum);
    const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
    const [totalProducts, setTotalProducts] = useState(0);
    const [pendingCall, setPendingCall] = useState(globelPendingCall);
    const [payloads, setPayloads] = useState({});
    const [prevFilterValues, setPrevFilterValues] = useState(null);

    const [showPhotoGallery, setShowPhotoGallery] = useState(null);

    const fetchProducts = async (tempPayloads = payloads) => {
        setPendingCall(true);
        await getMyStoreProductsAPI(globalPageNum, tempPayloads).then(res => {
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
        const wrappedElement = document.getElementById('allMyFavProducts_element');
        if (isBottom(wrappedElement) && !globelCaughtAll && !globelPendingCall && !globelOpenFilterBox) {
            // fetchProducts();
            setPage(globalPageNum + 1);
            // document.removeEventListener('scroll', trackScrolling);
        }
    };

    const onFilter = (data) => {
        setPrevFilterValues(data);
        setPayloads(data);
        setProducts([]);
        setPage(1);
        setCaughtAll(false);
        setTotalProducts(0);
        setPendingCall(false);
        setOpenFilterBox(false);
    }

    useEffect(() => {
        globelCaughtAll = caughtAll;
        globelPendingCall = pendingCall;
        globelOpenFilterBox = openFilterBox;
        globalPageNum = page;
        // eslint-disable-next-line
    }, [caughtAll, pendingCall, openFilterBox, page])

    useEffect(() => {
        if (!openFilterBox)
            fetchProducts();
        // eslint-disable-next-line
    }, [page, openFilterBox])

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return (() => {
            document.removeEventListener('scroll', trackScrolling);
            globelCaughtAll = false;
            globelPendingCall = false;
            globelOpenFilterBox = true;
            globalPageNum = 1;
        })
        // eslint-disable-next-line
    }, []);

    return (
        <div className='ManageProducts' >
            <div className='ManageProducts-filter-wrapper' onClick={() => setOpenFilterBox(true)}>
                <img src='/assets/icons/svgs/filter.svg' alt='Filter' />
            </div>
            {openFilterBox && <ProductFilter
                onClose={() => setOpenFilterBox(false)}
                categoryOptions={categories}
                sortByOptions={sortByChoices}
                initSortBy={sortByChoices.length > 0 ? sortByChoices[0].value : ""}
                onSubmit={onFilter}
                prevFilterValues={prevFilterValues}
            />}
            {!!showPhotoGallery && <PhotoGalleryEditPopup productId={showPhotoGallery} onClosePopup={()=>setShowPhotoGallery(false)} />}
            <div className='ManageProducts-container' id='allMyFavProducts_element'>
                <h4>{t("totol-results")} {totalProducts}</h4>
                {products.map((tempProduct, i) => <div key={i} >
                    <ProductCardForStore product={tempProduct} onCameraClick={setShowPhotoGallery} />
                </div>)}
                {!caughtAll && pendingCall && <><div className='ExploreStores-Loading-more'><p>{t("loading")}</p></div></>}
            </div>
            <Outlet />
        </div>
    )
}

export default ManageProducts