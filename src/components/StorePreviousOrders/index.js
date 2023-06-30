import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getStoresPreviousOrdersAPI } from '../../apis/common';
import PreviousOrdersCard from '../PreviousOrdersCard';
import './style.css';
// const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function StorePreviousOrders() {

    const [t,] = useTranslation('exploreStores');
    const [orders, setOrders] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalOrders, setTotalOrders] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

    const fetchOrders = async () => {
		setPendingCall(true);
		await getStoresPreviousOrdersAPI(globalPageNum).then(res => {
			if (res.data.status === 'success') {
				setOrders(renderedOrders => [...renderedOrders, ...res.data.orders]);
				setCaughtAll(res.data.caughtAll);
				setTotalOrders(res.data.orders_count);
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
		const wrappedElement = document.getElementById('allUserNotifications_element');
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
		fetchOrders();
		// eslint-disable-next-line
	}, [page])

    return (
        <div id='allUserNotifications_element' >
            <h4 className='StorePreviousOrders-TotalresultNum'>{t("totol-results")} {totalOrders}</h4>
			{orders.map((order, i) => <PreviousOrdersCard key={i} order={order} onStore={true} />)}
			{!caughtAll && <><div className='ExploreStores-Loading-more'><p>{t("loading")}</p></div></>}
		</div>
    )
}

export default StorePreviousOrders