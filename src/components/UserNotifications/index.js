import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getStoreNotificationsAPI, getUserNotificationsAPI } from '../../apis/common';
import UserNotificationCard from '../UserNotificationCard';
import './style.css';


var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

function UserNotifications({onStore=false}) {

    const [t,] = useTranslation('exploreStores');
    const [notifications, setNotifications] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalNotifications, setTotalNotifications] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

    const fetchNotifications = async () => {
		setPendingCall(true);
		await getUserNotificationsAPI(globalPageNum).then(res => {
			if (res.data.status === 'success') {
				setNotifications(renderedNotifications => [...renderedNotifications, ...res.data.notifications]);
				setCaughtAll(res.data.caughtAll);
				setTotalNotifications(res.data.notifications_count);
			}
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
	}
    const fetchStoreNotifications = async () => {
		setPendingCall(true);
		await getStoreNotificationsAPI(globalPageNum).then(res => {
			if (res.data.status === 'success') {
				setNotifications(renderedNotifications => [...renderedNotifications, ...res.data.notifications]);
				setCaughtAll(res.data.caughtAll);
				setTotalNotifications(res.data.notifications_count);
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
		if(onStore) fetchStoreNotifications();
		else fetchNotifications();
		// eslint-disable-next-line
	}, [page])

    return (
        <div id='allUserNotifications_element' >
            <h4 className={onStore?'StorePreviousOrders-TotalresultNum':'ExploreStores-TotalresultNum'}>{t("totol-results")} {totalNotifications}</h4>
			{notifications.map((notification, i) => <UserNotificationCard onStore={onStore} key={i} notification={notification} />)}
			{!caughtAll && <><div className='ExploreStores-Loading-more'><p>{t("loading")}</p></div></>}
		</div>
    )
}

export default UserNotifications