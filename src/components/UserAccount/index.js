import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData } from 'react-router-dom';
import { getUserAccountDetailsAPI, updateUserAccountSettingsApi } from '../../apis/common';
import AddressInputList from '../commons/AddressInputList';
import PhoneInputList from '../commons/PhoneInputList';
import './style.css';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async () => {
	let data = null;
	await getUserAccountDetailsAPI().then(res => {
		if(res.data.status === "success"){
			data = res.data.data;
		}else toast.error(res.data.error[language])
	}).catch(err => toast.error(err.massage));
	if(!!data) return {data};
	return redirect("/");
}

function UserAccount() {

	const [t, ] = useTranslation('UserAccount');
	const { data } = useLoaderData();
	const [fullName, setFullName] = useState(data.fullName);
	const [contactNumbers, setContactNumbers] = useState(data.whatapp_contacts)
	const [addresses, setAddresses] = useState(data.addresses);
	const [userThemeColor, setUserThemeColor] = useState(data.user_theme_color);

	const onThemeColorChange = (selectedColor) => {
		var r = document.querySelector(':root');
		r.style.setProperty('--user-primary', selectedColor);
		setUserThemeColor(selectedColor);
	}

	useEffect(() => {
		// onThemeColorChange('#fb9f6a');
		return (() => {
			let storeThemeColor = localStorage.getItem('user_theme_color');
			if (!!storeThemeColor && storeThemeColor !== 'null' && storeThemeColor !== 'undefined') {
				onThemeColorChange(storeThemeColor);
			} else {
				onThemeColorChange('#068dac');
			}
		})
	}, [])

	const onSubmit = async () => {

		let hasErrors = false;
		if(!fullName){
			toast.error(t("messages.requiredFields.fullName"));
			hasErrors = true;
		}

		addresses.forEach(({
			house_number,
			street,
			landmark,
			cep_or_pincode,
			city,
			state,
			country
		}, index)=>{
			if(!house_number && !hasErrors){
				toast.error(t("messages.requiredFields.house_number", {"position": index+1}));
				hasErrors = true;
			}
			if(!street && !hasErrors){
				toast.error(t("messages.requiredFields.street", {"position": index+1}));
				hasErrors = true;
			}
			if(!landmark && !hasErrors){
				toast.error(t("messages.requiredFields.landmark", {"position": index+1}));
				hasErrors = true;
			}
			if(!cep_or_pincode && !hasErrors){
				toast.error(t("messages.requiredFields.cep_or_pincode", {"position": index+1}));
				hasErrors = true;
			}
			if(!city && !hasErrors){
				toast.error(t("messages.requiredFields.city", {"position": index+1}));
				hasErrors = true;
			}
			if(!state && !hasErrors){
				toast.error(t("messages.requiredFields.state", {"position": index+1}));
				hasErrors = true;
			}
			if(!country && !hasErrors){
				toast.error(t("messages.requiredFields.country", {"position": index+1}));
				hasErrors = true;
			}
		})

		contactNumbers.forEach(({number, type}, index)=>{
			if(!number && !hasErrors){
				toast.error(t("messages.requiredFields.number", {"position": index+1}));
				hasErrors = true;
			}
			if(!type && !hasErrors){
				toast.error(t("messages.requiredFields.type", {"position": index+1}));
				hasErrors = true;
			}
		})

		if(!hasErrors){
			var formData = new FormData();
			formData.append('fullName', fullName);
			formData.append('themeColor', userThemeColor);
			formData.append('addresses', JSON.stringify(addresses));
			formData.append('contactNumbers', JSON.stringify(contactNumbers));

			await updateUserAccountSettingsApi(formData).then(res=>{
				if(res.data.status === 'success'){
					if(language==='pt') toast.error(res.data.message.pt);
					else toast.success(res.data.message.en);
					localStorage.setItem('user_theme_color', userThemeColor);
				}
				else{
					if(language==='pt') toast.error(res.data.error.pt);
					else toast.error(res.data.error.en);
				}
			}).catch(err=>toast.error(err.message));
		}
	}

	return (
		<div className='UserAccount'>
			<div className='UserAccount-input-div'>
				<label className='UserAccount-input-label' htmlFor='UserAccount-full-name-input'>
					{t("input-labels.fullname")}
				</label> <br />
				<input
					id='UserAccount-full-name-input'
					className='UserAccount-full-name-input'
					value={fullName}
					onChange={e => {
						if (e.target.value.length < 500) {
							setFullName(e.target.value);
						} else {
							toast.error(t("messages.fullname"));
						}
					}}
				/>
			</div>
			<hr />
			<div className='UserAccount-input-div'>
				<div className='UserAccount-user-color-input-label-div'>
					<label className='UserAccount-input-label' htmlFor='UserAccount-user-color-input'>
						{t("input-labels.theme-color")}
					</label>
				</div>
				<input
					id='UserAccount-user-color-input'
					className='UserAccount-user-color-input'
					type='color'
					value={userThemeColor}
					onChange={e => onThemeColorChange(e.target.value)}
				/>
			</div>
			<hr />
			<div className='UserAccount-input-div'>
				<AddressInputList
					addresses={addresses}
					setAddresses={setAddresses}
					primaryColor='var(--user-primary)'
				/>
			</div>
			<hr />
			<div className='UserAccount-input-div'>
				<PhoneInputList
					phoneNumbers={contactNumbers}
					setPhoneNumbers={setContactNumbers}
					primaryColor='var(--user-primary)'
				/>
			</div>
			<hr />
			<div className='UserAccount-input-div'>
				<button
					className='user-submit-button1 w-100'
					onClick={onSubmit}
				>{t("button-text.save")}</button>
			</div>
		</div>
	)
}

export default UserAccount