import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { checkStoreIdentifierAPI, createStoreApi } from '../../apis/common';
import './style.css';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export async function loader() {
    let store_id = localStorage.getItem("store_id");
	if(!!store_id && store_id !== 'null') return redirect(`/my-store/dashboard`);
	return {'storeExists': false};
}

function CreateStore() {

	const [t, ] = useTranslation('createStore');
	const navigate = useNavigate();
	const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

	const [storeIdHelpText, setStoreIdHelpText] = useState(false);
	const [id, setId] = useState('');
	const [isIdUnique, setIdUnique] = useState(false);
	const [storeName, setStoreName] = useState('');
	const [storeLogo, setStoreLogo] = useState(null);
	const [storeLogoHelpText, setStoreLogoHelpText] = useState(false);
	const [storeNameError, setStoreNameError] = useState('');
	const [storeLogoError, setStoreLogoError] = useState('');
	const [storeDesc, setStoreDesc] = useState('');
	const [storeDescError, setStoreDescError] = useState(false);
	const [storeThemeColor, setStoreThemeColor] = useState('');
	const [storeThemeColorHelpText, setStoreThemeColorHelpText] = useState(false);

	const checkAndSetId = async (e) => {
		let val = e.target.value.replace(/[^\w-]/gi, '').toLocaleLowerCase()
		setId(val);
		if(!!val){
			await checkStoreIdentifierAPI(val).then(res=>{
				if(res.data.status === 'success'){
					setIdUnique(!res.data.identifierExists);
				}else{
					setIdUnique(false);
				}
			}).catch(err=>{
				toast.error(err.message);
				setIdUnique(false);
			})
		}else{
			setIdUnique(false);
		}
	}

	const onStoreLogoChange = (e) => {
		let logo = e.target.files[0];
		if(logo.size/1024 > 500){
			setStoreLogoError(t("messages.logoSize"));
			return;
		}
		setStoreLogo(logo);
		setStoreLogoError('');
	}

	const onThemeColorChange = (selectedColor) => {
		var r = document.querySelector(':root');
		r.style.setProperty('--user-primary', selectedColor);
		setStoreThemeColor(selectedColor);
	}

	const onSubmit = async () => {

		if(!storeName){
			toast.error(t("messages.required.name"))
			return
		}
		if(!storeLogo){
			toast.error(t("messages.required.logo"))
			return
		}
		if(!storeDesc){
			toast.error(t("messages.required.desc"))
			return
		}
		if(!id){
			toast.error(t("messages.required.id"))
			return
		}

		if(!!storeLogo && !!id && !!storeDesc){
			var formData = new FormData();
			formData.append('identifier', id);
			formData.append('storeName', storeName);
			formData.append('logo', storeLogo);
			formData.append('description', storeDesc);
			formData.append('themeColor', storeThemeColor);

			await createStoreApi(formData).then(res=>{
				if(res.data.status === 'success') navigate('/my-store/menu/store-settings');
				else{
					if(language==='pt') toast.error(res.data.error.pt);
					else toast.error(res.data.error.en);
				}
			}).catch(err=>toast.error(err.message));
		}
	}

	useEffect(()=>{
		onThemeColorChange('#fb9f6a');
		return (()=>{
			let userThemeColor = localStorage.getItem('user_theme_color');
			if(!!userThemeColor && userThemeColor!=='null' && userThemeColor!=='undefined'){
				onThemeColorChange(userThemeColor);
			}else{
				onThemeColorChange('#068dac');
			}
		})
	},[])

	return (
		<div className='CreateStore'>
			<div>
				<label htmlFor='CreateStore-store-id-input' className='CreateStore-store-id-input-text'>
					<p className='CreateStore-store-id-input-text1 CreateStore-input-label'>{t("input-labels.identifier")}</p>
					<p className='CreateStore-question-mark' onClick={()=>setStoreIdHelpText(!storeIdHelpText)}>?</p>
				</label>
				{storeIdHelpText && <p className='CreateStore-help-text'>
					{t("helper-text.identifier.line2-1")} <b>"{t("helper-text.identifier.line2-2")}"</b>
					{t("helper-text.identifier.line3")} <br/>
					<b>"{t("helper-text.identifier.line4")}"</b>, <br/>
					<b>"{t("helper-text.identifier.line5")}"</b> <br/>
					<b>"{t("helper-text.identifier.line6")}"</b> <br/>
						{t("helper-text.identifier.line7")} <br/>
					<b>"{t("helper-text.identifier.line8")}"</b>, <br/>
					<b>"{t("helper-text.identifier.line9")}"</b> <br/>
					<b>"{t("helper-text.identifier.line10")}"</b> <br/>
						{t("helper-text.identifier.line11")}
				</p>}
				<code className='CreateStore-store-id-input-p'>https://golive.store/
					<input 
						id='CreateStore-store-id-input' 
						value={id}
						onChange={checkAndSetId}
					/>
				</code>
				{!!id && isIdUnique && <p className='CreateStore-unique-id-message text-success'>
					{t("messages.uniqueId")}
				</p>}

				{!!id && !isIdUnique && <p className='CreateStore-unique-id-message text-danger'>
					{t("messages.uniqueId", {"id": id})}
				</p>}
				
			</div>

			<div className='CreateStore-input-div'>
				<label className='CreateStore-input-label' htmlFor='CreateStore-store-name-input'>
					{t("input-labels.storeName")}
				</label> <br/>
				<input 
					id='CreateStore-store-name-input' 
					value={storeName}
					onChange={e=>{
						if(e.target.value.length<99){
							setStoreName(e.target.value);
							setStoreNameError('');
						}else{
							setStoreNameError(t("messages.storeName.moreCharThanLimit"));
						}
					}}
				/>
				{!!storeNameError && <p className='CreateStore-unique-id-message text-danger'>{storeNameError}</p>}
			</div>

			<div className='CreateStore-input-div'>
				<h4 className='CreateStore-input-label CreateStore-flex-inline'>{t("input-labels.logo")} <p className='CreateStore-question-mark' onClick={()=>setStoreLogoHelpText(!storeLogoHelpText)}>?</p> </h4>
				{storeLogoHelpText && <p className='CreateStore-help-text'>
					{t("helper-text.logo")}
				</p>}
				<label className='CreateStore-input-label' htmlFor='CreateStore-store-logo-input'>
					<h3 className='Create-store-file-input-label'>{t("button-text.logo")}</h3>
				</label>
				<input 
					id='CreateStore-store-logo-input'
					type='file'
					accept="image/png, image/jpeg"
					// value={storeLogo}
					onChange={onStoreLogoChange}
				/>
				{storeLogoError && <p className='CreateStore-unique-id-message text-danger'>{storeLogoError}</p> }
				<div className="Create-store-file-input-preview">
					{!!storeLogo ? <img
						src={URL.createObjectURL(storeLogo)}
						alt="logo"
					/>:<p>
						{t("logo-preview-text")}
					</p>}
				</div>
			</div>

			<div className='CreateStore-input-div'>
				<label className='CreateStore-input-label' htmlFor='CreateStore-store-desc-input'>
					{t("input-labels.description")}
				</label> <br/>
				<textarea 
					id='CreateStore-store-desc-input' 
					rows='5'
					value={storeDesc}
					onChange={e=>{e.target.value.length<700 ? setStoreDesc(e.target.value): setStoreDescError(true) }}
				></textarea>
				{storeDescError && <p className='CreateStore-unique-id-message text-danger'>{t("messages.description.moreCharThanLimit")}</p>}
			</div>

			<div className='CreateStore-input-div'>
				<div className='CreateStore-store-color-input-label-div'>
					<label className='CreateStore-input-label' htmlFor='CreateStore-store-color-input'>
						{t("input-labels.theme-color")}
					</label>
					<p className='CreateStore-question-mark' onClick={()=>setStoreThemeColorHelpText(!storeThemeColorHelpText)}>?</p>
				</div>
				{storeThemeColorHelpText && <p className='CreateStore-help-text'>
					{t("helper-text.theme-color")}
				</p>}
				<input 
					id='CreateStore-store-color-input' 
					type='color'
					value={storeThemeColor}
					onChange={e=>onThemeColorChange(e.target.value)}
				/>
			</div>

			<div className='CreateStore-input-div'>
				<button
					className='user-submit-button1 w-100'
					onClick={onSubmit}
				>{t("button-text.create")}</button>
			</div>
		</div>
	)
}

export default CreateStore