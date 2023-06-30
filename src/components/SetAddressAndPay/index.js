import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import { addressAndPayScreenCheckAPI, cancelTheOrderAPI, editTheOrderAPI, getDelieveryCostByZipCodeForOrdersAPI, saveAddressAndContinueOrderAPI } from '../../apis/common';
import NormalInput from '../commons/NormalInput';
import './style.css'

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async () => {
    let hasProductsInBag = false;
    let hasOrders = false;
    let hasOrdersWithDelivery = false;
    let country = 'Brazil';
    let totalOfSubtotals = 0;
	let totalOfDeliveryCosts = 0;
	let totalOfTotals = 0;
	let defaultAddressByProfile = null;
    await addressAndPayScreenCheckAPI().then(res => {
        hasProductsInBag = res.data.hasProductsInBag;
        hasOrders = res.data.hasOrders;
        hasOrdersWithDelivery = res.data.hasOrdersWithDelivery;
        country = res.data.country;
        totalOfSubtotals = res.data.totalOfSubtotals;
        totalOfDeliveryCosts = res.data.totalOfDeliveryCosts;
        totalOfTotals = res.data.totalOfTotals;
        defaultAddressByProfile = res.data.defaultAddressByProfile;
    }).catch(err => toast.error(err.message));

    let pathName = 'BrazilPayment';
    if(country==='Brazil') pathName = 'BrazilPayment';
    if(country==='India') pathName = 'IndiaPayment';
    if(country==='United States') pathName = 'USPayment';

    if (!hasOrders) return redirect('/bag');
    let fullPath = `/bag/${pathName}`
    if (!hasOrdersWithDelivery) return redirect(fullPath);
    return { 
        "hasProductsInBag": hasProductsInBag,
		"totalOfSubtotals": totalOfSubtotals,
		"totalOfDeliveryCosts": totalOfDeliveryCosts,
		"totalOfTotals": totalOfTotals,
		"country": country,
		"defaultAddressByProfile": defaultAddressByProfile,
		"fullPathToRedirect": fullPath,
     }
}

function SetAddressAndPay() {

    const { hasProductsInBag, fullPathToRedirect, totalOfSubtotals, totalOfDeliveryCosts, totalOfTotals, defaultAddressByProfile } = useLoaderData();
    const [t, ] = useTranslation('setAddressAndPay');
    const history = useNavigate();
    let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
    if (!currentStoreCurrency) currentStoreCurrency = 'R$';

    const [address, setAddress] = useState(defaultAddressByProfile);
    const [deliveryCost, setDeliveryCost] = useState(totalOfDeliveryCosts);
    const [totalCost, setTotalCost] = useState(totalOfTotals);
    const [calculatingDeliveryCost, setCalculatingDeliveryCost] = useState(false)

    const calcultaeDCost = async (zipOrCep) => {
		await getDelieveryCostByZipCodeForOrdersAPI({ zipOrCep }).then(res => {
			if (res.data.status === "success") {
				let dCost = res.data.cost;
				setDeliveryCost(dCost);
				setTotalCost(totalOfSubtotals + dCost);
				setCalculatingDeliveryCost(false);
			} else toast.error(res.data.error[language]);
		}).catch(err => toast.error(err.message));
	}

	const onZipOrCepChange = (e) => {
		let val = e.target.value;
		setCalculatingDeliveryCost(true);
		setAddress(prevAdd=>{return {...prevAdd, cep_or_pincode: val}})
		if (val.length >= 5) {
			calcultaeDCost(val);
		} else {
			setTotalCost(totalOfSubtotals);
			setDeliveryCost(0);
		}
	}

    const onSaveAndContinue = async () => {
        if(!address.cep_or_pincode || address.cep_or_pincode.length<5){
            toast.error(t("errors.cep_or_pincode"));
            return;
        }
        if(!address.house_number){
            toast.error(t("errors.house_number"));
            return;
        }
        if(!address.street){
            toast.error(t("errors.street"));
            return;
        }
        if(!address.landmark){
            toast.error(t("errors.landmark"));
            return;
        }
        if(!address.city){
            toast.error(t("errors.city"));
            return;
        }
        if(!address.state){
            toast.error(t("errors.state"));
            return;
        }
        if(!address.phone){
            toast.error(t("errors.state"));
            return;
        }

        await saveAddressAndContinueOrderAPI(address).then(res=>{
            if(res.data.status === "success"){
                history(fullPathToRedirect);
            }else{
                toast.error(res.data.error[language]);
            }
        }).catch(err=>toast.error(err.message));
    }

    const onCancel = async () => {
        await cancelTheOrderAPI().then(res=>{
            if(res.data.status === "success"){
                history(`/bag`);
            }else{
                toast.error(res.data.error[language]);
            }
        }).catch(err=>toast.error(err.message));
    }

    const onEdit = async () => {
        await editTheOrderAPI().then(res=>{
            if(res.data.status === "success"){
                history(`/bag`);
            }else{
                toast.error(res.data.error[language]);
            }
        }).catch(err=>toast.error(err.message));
    }

    return (
        <div className='SetAddressAndPay'>
            {hasProductsInBag && <p className='SetAddressAndPay-top-note'>{t("notes.productInBag")}</p>}
            
            <div className='SetAddressAndPay-totals-div'>
                <p><span>{t("totals.subtotals")}</span><span>{currentStoreCurrency}: {currencyConverter(totalOfSubtotals/100, currentStoreCurrency)}</span></p>
                <p><span>{t("totals.deliveryTotals")}</span>
                    {calculatingDeliveryCost?
                        <span>{currentStoreCurrency}: {t("calculating")}</span>
                        :
                        <span>{currentStoreCurrency}: {currencyConverter(deliveryCost/100, currentStoreCurrency)}</span>
                    }</p>
                <p><span>{t("totals.totals")}</span>
                    {calculatingDeliveryCost?
                        <span>{currentStoreCurrency}: {t("calculating")}</span>
                        :
                        <span>{currentStoreCurrency}: {currencyConverter(totalCost/100, currentStoreCurrency)}</span>
                    }</p>
            </div>

            <div className='SetAddressAndPay-address-div'>
                <div className='SetAddressAndPay-address-div-head'>
                    <img src='/assets/icons/svgs/shippingTruckWhite.svg' alt='shippingTruckWhite' />
                    <p>{t("address.head")}</p>
                </div>
                <div className='SetAddressAndPay-inaddress-inline-div'>
                    <div>
                        <h6 className='SetAddressAndPay-inaddress-label'>{t("address.cepOrZip")}</h6>
                        <NormalInput 
                            value={address.cep_or_pincode}
                            onChange={onZipOrCepChange}
                            placeholder={t("palceholders.cep_or_pincode")}
                        />
                    </div>
                    <div>
                        <h6 className='SetAddressAndPay-inaddress-label'>{t("address.houseNumber")}</h6>
                        <NormalInput
                            value={address.house_number}
                            onChange={e=>setAddress(prevAdd=>{return {...prevAdd, house_number: e.target.value}})}
                            placeholder={t("palceholders.house_number")}
                        />
                    </div>
                </div>
                <div className='SetAddressAndPay-inaddress-div'>
                    <h6 className='SetAddressAndPay-inaddress-label'>{t("address.street")}</h6>
                    <NormalInput
                        value={address.street}
                        onChange={e=>setAddress(prevAdd=>{return {...prevAdd, street: e.target.value}})}
                        placeholder={t("palceholders.street")}
                    />
                </div>
                <div className='SetAddressAndPay-inaddress-div'>
                    <h6 className='SetAddressAndPay-inaddress-label'>{t("address.landmark")}</h6>
                    <NormalInput
                        value={address.landmark}
                        onChange={e=>setAddress(prevAdd=>{return {...prevAdd, landmark: e.target.value}})}
                        placeholder={t("palceholders.landmark")}
                    />
                </div>
                <div className='SetAddressAndPay-inaddress-inline-div'>
                    <div>
                        <h6 className='SetAddressAndPay-inaddress-label'>{t("address.city")}</h6>
                        <NormalInput 
                            value={address.city}
                            onChange={e=>setAddress(prevAdd=>{return {...prevAdd, city: e.target.value}})}
                            placeholder={t("palceholders.city")}
                        />
                    </div>
                    <div>
                        <h6 className='SetAddressAndPay-inaddress-label'>{t("address.state")}</h6>
                        <NormalInput
                            value={address.state}
                            onChange={e=>setAddress(prevAdd=>{return {...prevAdd, state: e.target.value}})}
                            placeholder={t("palceholders.state")}
                        />
                    </div>
                </div>
                <div className='SetAddressAndPay-inaddress-div'>
                    <h6 className='SetAddressAndPay-inaddress-label'>{t("address.phone")}</h6>
                    <NormalInput
                        value={address.phone}
                        onChange={e=>setAddress(prevAdd=>{return {...prevAdd, phone: e.target.value}})}
                        placeholder={t("palceholders.phone")}
                    />
                </div>
            </div>

            <div className='SetAddressAndPay-address-div'>
                <p className='user-submit-button1 SetAddressAndPay-submitBtn' onClick={onSaveAndContinue}>{t("submitBtn")}</p>
                <div className='SetAddressAndPay-cancel-div'>
                    <p className='user-submit-button1 SetAddressAndPay-cancelBtn-left' onClick={onCancel}>{t("cancelBtn")}</p>
                    <p className='user-submit-button1 SetAddressAndPay-cancelBtn-right' onClick={onEdit}>{t("editBtn")}</p>
                </div>
            </div>
        </div>
    )
}

export default SetAddressAndPay