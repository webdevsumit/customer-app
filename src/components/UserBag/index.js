import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import { bottomScrollGapInPixels } from '../../actions/variables';
import { getProductsInUsersBagAPI, removeProductFromBagProductByIdAPI, setQuantityByProductsInUsersBagIdAPI, userBagCheckoutAPI } from '../../apis/common';
// import NormalSelect from '../commons/NormalSelect';
import UserBagCard from '../UserBagCard';
import './style.css';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

var globelCaughtAll = false;
var globelPendingCall = false;
var globalPageNum = 1;

let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if (!currentStoreCurrency) currentStoreCurrency = 'R$';

function UserBag() {

	const navigate = useNavigate();
	const [t,] = useTranslation('userBag');
	
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(globalPageNum);
	const [caughtAll, setCaughtAll] = useState(globelCaughtAll);
	const [totalProducts, setTotalProducts] = useState(0);
	const [subTotalCost, setSubTotalCost] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const [pendingCall, setPendingCall] = useState(globelPendingCall);

	const [deliveryType,] = useState("without-delivery");
	// const [deliveryType, setDeliveryType] = useState("without-delivery");
	const [deliveryZipOrCep, setDeliveryZipOrCep] = useState("");
	const [deliveryCost, setDeliveryCost] = useState(0);
	const [calculatingDeliveryCost, setCalculatingDeliveryCost] = useState(false);
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

	// const distanceOptions = [
	// 	{ label: t("with-delivery"), value: "with-delivery" },
	// 	{ label: t("without-delivery"), value: "without-delivery" }
	// ]

	// const onDeliveryTypeChange = (e) => {
	// 	let val = e.target.value;
	// 	setDeliveryCost(0);
	// 	if (val === "without-delivery") {
	// 		setCalculatingDeliveryCost(false);
	// 		setTotalCost(subTotalCost);
	// 		setDeliveryCost(0);
	// 	} else {
	// 		setCalculatingDeliveryCost(true);
	// 		if (!!deliveryZipOrCep) calcultaeDCost(deliveryZipOrCep);
	// 		else {
	// 			setTotalCost(subTotalCost);
	// 			setDeliveryCost(0);
	// 		}
	// 	}
	// 	setDeliveryType(val);
	// }

	const calcultaeDCost = async (zipOrCep) => {

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
				if(res.data.is_checkedout){
					navigate(`/${res.data.storeId}/bag/${res.data.orderId}/addressAndPay`);
				}
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		setPendingCall(false);
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
		if (!globelCaughtAll) 
			fetchProducts();
		// eslint-disable-next-line
	}, [page])

	const changeQuantity = async (id, quantity) => {
		await setQuantityByProductsInUsersBagIdAPI(id, quantity).then(res => {
			if (res.data.status === "success") {
				onZipOrCepChange({target: {value: ""}});
				toast.success(t("quantityChanged"));
				let quantityToChange = res.data.quantity;
				setProducts(renderedProducts => [
					...renderedProducts.filter(prd=>prd.id!==id), 
					{
						...renderedProducts.filter(prd=>prd.id===id)[0], 
						quantity: quantityToChange,
						product: {
							...renderedProducts.filter(prd=>prd.id===id)[0].product,
							quantity: res.data.maxQuantity
						}
					}
				]);
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
					// onZipOrCepChange({target: {value: ""}});
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
			deliveryZipOrCep: deliveryZipOrCep,
			totalCost: totalCost,
		}
		await userBagCheckoutAPI(payloads).then(res => {
			if (res.data.status === "success") {
				navigate(`/${res.data.storeId}/bag/${res.data.orderId}/addressAndPay`);
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
		setIsCheckoutLoading(false);
	}

	return (
		<div className='UserBag' id='allBagProducts_element'>
			<h4 className='ExploreStores-TotalresultNum'>{t("totol-results")} {totalProducts}</h4>
			{products.map((product, i) => <UserBagCard key={i} product={product} changeQuantity={changeQuantity} removeProductFromList={removeProductFromList} />)}
			{(!caughtAll) && <><div className='ExploreStores-Loading-more'><p>{t("loading")}</p></div></>}
			{(products.length > 0) ? <>
				<div className='UserBag-total-div'>
					<div className='UserBag-total-div-container'>
						<p>{t("subtotal")}</p>
						<p>{currentStoreCurrency}: {currencyConverter((subTotalCost) / 100, currentStoreCurrency)}</p>
					</div>
					<div className='UserBag-total-div-container'>
						<p>Delivery Cost</p>
						{/* <div className='UserBag-distance-options'>
							<NormalSelect options={distanceOptions} value={deliveryType} onChange={onDeliveryTypeChange} placeholder={t("selectPlaceholder")} />
						</div> */}
						<div className='UserBag-distance-options'>
							{deliveryType === "with-delivery" &&
								<input placeholder={t('placeholder.zipOrCep')} value={deliveryZipOrCep} onChange={onZipOrCepChange} />
							}
						</div>
						{
							calculatingDeliveryCost ?
								<p>{currentStoreCurrency}: {t("calculating")}</p>
								:
								<p>{currentStoreCurrency}: {currencyConverter((deliveryCost)  / 100, currentStoreCurrency)}</p>
						}
					</div>
					<div className='UserBag-total-div-container'>
						<p>{t("total")}</p>
						<p>{currentStoreCurrency}: {currencyConverter((totalCost) / 100, currentStoreCurrency)}</p>
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