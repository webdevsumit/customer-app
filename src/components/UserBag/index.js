import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { addressAndPayScreenCheckAPI, getDelieveryCostByZipCodeAPI, getProductsInUsersBagAPI, removeProductFromBagProductByIdAPI, setQuantityByProductsInUsersBagIdAPI, userBagCheckoutAPI } from '../../apis/common';
import { getDelieveryCostByZipCodeAPI_onTicTag, getProductsInUsersBagAPI_onTicTag, removeProductFromBagProductByIdAPI_onTicTag } from '../../apis/tictag';
import NormalSelect from '../commons/NormalSelect';
import UserBagCard from '../UserBagCard';
import './style.css';


export const loader = async () => {
    let hasProductsInBag = false;
    let hasOrders = false;
	let zipInProfile = "";
	let userProfileId = null;
    await addressAndPayScreenCheckAPI().then(res => {
        hasProductsInBag = res.data.hasProductsInBag;
        hasOrders = res.data.hasOrders;
        zipInProfile = !!res.data.zipInProfile? res.data.zipInProfile : "";
        userProfileId = res.data.userProfileId;
    }).catch(err => toast.error(err.message));

    if (!!hasOrders) return redirect('/bag/addressAndPay');
    return { 
		"hasProductsInBag": hasProductsInBag, 
		"zipInProfile": zipInProfile,
		"userProfileId": userProfileId,
	 }
}


const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

var globelCaughtAll_onTicTag = false;
var globelPendingCall_onTicTag = false;
var globalPageNum_onTicTag = 0;

let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if (!currentStoreCurrency) currentStoreCurrency = 'R$';

function UserBag() {

	const { zipInProfile, userProfileId } = useLoaderData();
	const history = useNavigate();
	const [t,] = useTranslation('userBag');
	
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalProducts, setTotalProducts] = useState(0);
	const [subTotalCost, setSubTotalCost] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

	const [products_onTicTag, setProducts_onTicTag] = useState([]);
	const [page_onTicTag, setPage_onTicTag] = useState(globalPageNum_onTicTag);
	const [caughtAll_onTicTag, setCaughtAll_onTicTag] = useState(globelCaughtAll_onTicTag);
	const [totalProducts_onTicTag, setTotalProducts_onTicTag] = useState(0);
	const [subTotalCost_onTicTag, setSubTotalCost_onTicTag] = useState(0);
	const [totalCost_onTicTag, setTotalCost_onTicTag] = useState(0);
	const [pendingCall_onTicTag, setPendingCall_onTicTag] = useState(globelPendingCall_onTicTag);

	const [deliveryType, setDeliveryType] = useState("with-delivery");
	const [deliveryZipOrCep, setDeliveryZipOrCep] = useState(zipInProfile);
	const [deliveryCost, setDeliveryCost] = useState(0);
	const [deliveryCost_onTicTag, setDeliveryCost_onTicTag] = useState(0);
	const [calculatingDeliveryCost, setCalculatingDeliveryCost] = useState(true);
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

	const distanceOptions = [
		{ label: t("with-delivery"), value: "with-delivery" },
		{ label: t("without-delivery"), value: "without-delivery" }
	]

	const onDeliveryTypeChange = (e) => {
		let val = e.target.value;
		setDeliveryCost(0);
		setDeliveryCost_onTicTag(0);
		if (val === "without-delivery") {
			setCalculatingDeliveryCost(false);
			setTotalCost(subTotalCost);
			setDeliveryCost(0);
			setDeliveryCost_onTicTag(0);
		} else {
			setCalculatingDeliveryCost(true);
			if (!!deliveryZipOrCep) calcultaeDCost(deliveryZipOrCep);
			else {
				setTotalCost(subTotalCost);
				setDeliveryCost(0);
				setDeliveryCost_onTicTag(0);
			}
		}
		setDeliveryType(val);
	}

	const calcultaeDCost = async (zipOrCep) => {
		let gotDCostFromGolive = false;
		let gotDCostFromTictag = false;
		await getDelieveryCostByZipCodeAPI({ zipOrCep }).then(res => {
			if (res.data.status === "success") {
				let dCost = res.data.cost;
				setDeliveryCost(dCost);
				setTotalCost(subTotalCost + dCost);
				gotDCostFromGolive = true;
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		await getDelieveryCostByZipCodeAPI_onTicTag({ zipOrCep: zipOrCep, profileIdOnGolive: userProfileId }).then(res => {
			if (res.data.status === "success") {
				let dCost_onTicTag = res.data.cost;
				setDeliveryCost_onTicTag(dCost_onTicTag);
				setTotalCost_onTicTag(subTotalCost_onTicTag + dCost_onTicTag);
				gotDCostFromTictag = true;
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		if(gotDCostFromGolive && gotDCostFromTictag){
			setCalculatingDeliveryCost(false);
		}
	}

	const onZipOrCepChange = e => {
		let val = e.target.value;
		setCalculatingDeliveryCost(true);
		setDeliveryZipOrCep(val);
		if (val.length >= 5) {
			calcultaeDCost(val);
		} else {
			setTotalCost(subTotalCost);
			setDeliveryCost(0);
			setDeliveryCost_onTicTag(0);
		}
	}

	const fetchProducts = async () => {
		setPendingCall(true);
		await getProductsInUsersBagAPI(globalPageNum).then(res => {
			if (res.data.status === 'success') {
				setProducts(renderedProducts => [...renderedProducts, ...res.data.products]);
				setCaughtAll(res.data.caughtAll);
				setTotalProducts(res.data.products_count);
				setSubTotalCost(res.data.total);
				setTotalCost(res.data.total);
				if(res.data.caughtAll) setPage_onTicTag(1);
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
	}

	const fetchProducts_onTicTag = async () => {
		setPendingCall_onTicTag(true);
		await getProductsInUsersBagAPI_onTicTag(userProfileId, globalPageNum_onTicTag).then(res => {
			if (res.data.status === 'success') {
				setProducts_onTicTag(renderedProducts => [...renderedProducts, ...res.data.products]);
				setCaughtAll_onTicTag(res.data.caughtAll);
				setTotalProducts_onTicTag(res.data.products_count);
				setSubTotalCost_onTicTag(res.data.total);
				setTotalCost_onTicTag(res.data.total);
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		setPendingCall_onTicTag(false);
	}

	const isBottom = (el) => {
		// value of the difference is also positive becuase of extra div that we have under navbar
		// console.log(window.innerHeight - el.getBoundingClientRect().bottom);
		return window.innerHeight - el.getBoundingClientRect().bottom >= -bottomScrollGapInPixels;
	}

	const trackScrolling = () => {
		const wrappedElement = document.getElementById('allBagProducts_element');
		if (isBottom(wrappedElement) && !globelCaughtAll && !globelPendingCall) {
			// fetchProducts();
			setPage(globalPageNum + 1);
			// document.removeEventListener('scroll', trackScrolling);
		}else if(isBottom(wrappedElement) && !globelCaughtAll_onTicTag && !globelPendingCall_onTicTag) {
			// fetchProducts();
			setPage(globalPageNum_onTicTag + 1);
			// document.removeEventListener('scroll', trackScrolling);
		}
	};

	useEffect(() => {
		document.addEventListener('scroll', trackScrolling);
		if(!!zipInProfile){
			onZipOrCepChange({target: { value: zipInProfile}})
		}
		return (() => {
			document.removeEventListener('scroll', trackScrolling);
			globelCaughtAll = false;
			globelPendingCall = false;
			globalPageNum = 1;

			globelCaughtAll_onTicTag = false;
			globelPendingCall_onTicTag = false;
			globalPageNum_onTicTag = 0;
		})
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		globelCaughtAll = caughtAll;
		globelPendingCall = pendingCall;
		// eslint-disable-next-line
	}, [caughtAll, pendingCall])

	useEffect(() => {
		globelCaughtAll_onTicTag = caughtAll_onTicTag;
		globelPendingCall_onTicTag = pendingCall_onTicTag;
		// eslint-disable-next-line
	}, [caughtAll_onTicTag, pendingCall_onTicTag])

	useEffect(() => {
		globalPageNum = page;
		globalPageNum_onTicTag = page_onTicTag;
		if (!globelCaughtAll) fetchProducts();
		else if(!globelCaughtAll_onTicTag) fetchProducts_onTicTag();
		// eslint-disable-next-line
	}, [page, page_onTicTag])

	const changeQuantity = async (id, quantity) => {
		await setQuantityByProductsInUsersBagIdAPI(id, quantity).then(res => {
			if (res.data.status === "success") {
				onZipOrCepChange({target: {value: ""}});
				toast.success(t("quantityChanged"));
				setSubTotalCost(res.data.total);
				setTotalCost(res.data.total);
			}
			else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
	}

	const removeProductFromList = async (id) => {
		toast.promise(
			removeProductFromBagProductByIdAPI(id).then(res => {
				if (res.data.status === "success") {
					onZipOrCepChange({target: {value: ""}});
					toast.success(res.data.message[language]);
					setProducts(prevProducts => prevProducts.filter(pro => pro.id !== id))
					setSubTotalCost(res.data.total);
					setTotalCost(res.data.total);
				}
				else toast.error(res.data.error[language]);
			}).catch(err => toast.error(err.message)),
			{
				loading: '........',
			}
		)
	}

	const removeProductFromList_onTicTag = async (id) => {
		toast.promise(
			removeProductFromBagProductByIdAPI_onTicTag(id, userProfileId).then(res => {
				if (res.data.status === "success") {
					onZipOrCepChange({target: {value: ""}});
					toast.success(res.data.message[language]);
					setProducts_onTicTag(prevProducts => prevProducts.filter(pro => pro.id !== id))
					setSubTotalCost_onTicTag(res.data.total);
					setTotalCost_onTicTag(res.data.total);
				}
				else toast.error(res.data.error[language]);
			}).catch(err => toast.error(err.message)),
			{
				loading: '........',
			}
		)
	}

	const onCheckOut = async () => {
		if(deliveryType==="with-delivery" && !deliveryZipOrCep){
			toast.error(t("emptyZipcode"));
			return;
		}
		setIsCheckoutLoading(true);
		let payloads = {
			subTotalCost: subTotalCost,
			deliveryType: deliveryType,
			deliveryCost: deliveryCost,
			deliveryCost_onTicTag: deliveryCost_onTicTag,
			deliveryZipOrCep: deliveryZipOrCep,
			totalCost: totalCost,
			products_onTicTag: products_onTicTag,
		}
		await userBagCheckoutAPI(payloads).then(res => {
			if (res.data.status === "success") {
				history('/bag/addressAndPay');
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		setIsCheckoutLoading(false);
	}

	return (
		<div className='UserBag' id='allBagProducts_element'>
			<h4 className='ExploreStores-TotalresultNum'>{t("totol-results")} {totalProducts+totalProducts_onTicTag}</h4>
			{products.map((product, i) => <UserBagCard key={i} product={product} changeQuantity={changeQuantity} removeProductFromList={removeProductFromList} removeProductFromList_onTicTag={()=>{}} />)}
			{products_onTicTag.map((product, i) => <UserBagCard key={i} isFromTicTag={true} product={product} changeQuantity={changeQuantity} removeProductFromList={()=>{}} removeProductFromList_onTicTag={removeProductFromList_onTicTag} />)}
			{(!caughtAll || !caughtAll_onTicTag) && <><div className='ExploreStores-Loading-more'><p>{t("loading")}</p></div></>}
			{(products.length > 0 || products_onTicTag.length > 0) ? <>
				<div className='UserBag-total-div'>
					<div className='UserBag-total-div-container'>
						<p>{t("subtotal")}</p>
						<p>{currentStoreCurrency}: {currencyConverter((subTotalCost+subTotalCost_onTicTag) / 100, currentStoreCurrency)}</p>
					</div>
					<div className='UserBag-total-div-container'>
						<div className='UserBag-distance-options'>
							<NormalSelect options={distanceOptions} value={deliveryType} onChange={onDeliveryTypeChange} placeholder={t("selectPlaceholder")} />
						</div>
						<div className='UserBag-distance-options'>
							{deliveryType === "with-delivery" &&
								<input placeholder={t('placeholder.zipOrCep')} value={deliveryZipOrCep} onChange={onZipOrCepChange} />
							}
						</div>
						{
							calculatingDeliveryCost ?
								<p>{currentStoreCurrency}: {t("calculating")}</p>
								:
								<p>{currentStoreCurrency}: {currencyConverter((deliveryCost + deliveryCost_onTicTag)  / 100, currentStoreCurrency)}</p>
						}
					</div>
					<div className='UserBag-total-div-container'>
						<p>{t("total")}</p>
						<p>{currentStoreCurrency}: {currencyConverter((totalCost+totalCost_onTicTag) / 100, currentStoreCurrency)}</p>
					</div>
					<div className='UserBag-btn-div'>
						{isCheckoutLoading ?
							<p className='user-submit-button1'>{t("checkingoutBtn")}</p>
							:
							<p className='user-submit-button1' onClick={onCheckOut}>{t("checkoutBtn")}</p>
						}
					</div>
				</div>
			</> : <>
				<div className='UserBag-total-div-container'>
					<p>{t("emptyBagMessage")}</p>
				</div>
			</>}
		</div>
	)
}

export default UserBag