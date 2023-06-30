import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect } from 'react-router-dom';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getFavStoresByUserAPI, getNumberOfExploredStoresAPI } from '../../apis/common';
import ExploreStoreCard from '../ExploreStoreCard';
import './style.css';

export const loader = async () => {
	let explored_stores_count = 0;
	let store_unique_id = null;
	await getNumberOfExploredStoresAPI().then(res => {
		if (res.data.status === 'success') {
			explored_stores_count = res.data.explored_stores_count;
			store_unique_id = res.data.store_unique_id;
		}
	}).catch(err => toast.error(err.message));
	if (explored_stores_count === 0) return redirect("/explore/stores")
	if (explored_stores_count === 1) return redirect(`/${store_unique_id}`)
	return { 'explored_stores_count': explored_stores_count };
}

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function AllExploredStores() {

	const [t,] = useTranslation('exploreStores');
	const [stores, setStores] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalStores, setTotalStores] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

	const fetchStores = async () => {
		setPendingCall(true);
		await getFavStoresByUserAPI(globalPageNum).then(res => {
			if (res.data.status === 'success') {
				setStores(renderedStores => [...renderedStores, ...res.data.stores]);
				setCaughtAll(res.data.caughtAll);
				setTotalStores(res.data.stores_count);
			}
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
	}

	const isBottom = (el) => {
		// value of the difference is also positive becuase of extra div that we have under navbar
		// console.log(window.innerHeight - el.getBoundingClientRect().bottom);
		return window.innerHeight - el.getBoundingClientRect().bottom >= -bottomScrollGapInPixels;
	}

	const trackScrolling = () => {
		const wrappedElement = document.getElementById('allMyFavStores_element');
		if (isBottom(wrappedElement) && !globelCaughtAll && !globelPendingCall) {
			// fetchProducts();
			setPage(globalPageNum + 1);
			// document.removeEventListener('scroll', trackScrolling);
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
		fetchStores();
		// eslint-disable-next-line
	}, [page])


	const removeStoreFromTheList = (storeId) => {
		setStores(preStores=>{
			return [...preStores.filter(tempStore=>tempStore.id!==storeId)]
		});
		setTotalStores(prevTotal=>prevTotal-1);
	}

	return (
		<div id='allMyFavStores_element' >
			<h4 className='ExploreStores-TotalresultNum'>{t("totol-results")} {totalStores}</h4>
			{stores.map((store, i) => <ExploreStoreCard key={i} store={store} hasFavRemoveBtn={true} removeFromParentList={removeStoreFromTheList} />)}
			{!caughtAll && <><div className='ExploreStores-Loading-more'><p>{t("loading")}</p></div></>}
		</div>
	)
}

export default AllExploredStores