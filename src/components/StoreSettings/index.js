import React, { useEffect, useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { checkStoreIdentifierAPI, getStoreSettingsAPI, updateStoreSettingsApi } from '../../apis/common';
import AddressInputList from '../commons/AddressInputList';
import PhoneInputList from '../commons/PhoneInputList';
import './style.css';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const loader = async () => {
	let data;
	await getStoreSettingsAPI().then(res => {
		if (res.data.status === 'success') {
			data = res.data.data;
		}
	}).catch(err => toast.error(err.message));
	if (!data) {
		return redirect('/');
	}
	return { "data": data };
}

function StoreSettings() {

	const { data } = useLoaderData();
	const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
	const [t, ] = useTranslation('storeSettings');
	const navigate = useNavigate();

	const [storeIdHelpText, setStoreIdHelpText] = useState(false);
	const [id, setId] = useState(data.unique_id);
	const [isIdUnique, setIdUnique] = useState(false);
	const [storeName, setStoreName] = useState(data.store_name);
	const [storeLogo, setStoreLogo] = useState(null);
	const [storeLogoHelpText, setStoreLogoHelpText] = useState(false);
	const [storeNameError, setStoreNameError] = useState('');
	const [storeLogoError, setStoreLogoError] = useState('');
	const [storeDesc, setStoreDesc] = useState(data.store_description);
	const [storeDescError, setStoreDescError] = useState(false);
	const [storeThemeColor, setStoreThemeColor] = useState(data.store_theme_color);
	const [storeThemeColorHelpText, setStoreThemeColorHelpText] = useState(false);
	const [addresses, setAddresses] = useState(data.store_addresses.map(add=>{ return{
																				'id': add.id,
																				'cep_or_pincode': add.cep_or_pincode,
																				'house_number': add.house_number,
																				'street': add.street,
																				'landmark': add.landmark,
																				'city': add.city,
																				'state': add.state,
																				'country': add.country,
																				// 'latitude': add.latitude,
																				// 'longtude': add.longtude,
																			}}));
	const [contactNumbers, setContactNumbers] = useState(data.store_contact_numbers.map(cn=>{ return{
																							'id': cn.id,
																							'number': cn.number,
																							'type': cn.type,
																							'is_whatsapp': cn.is_whatsapp,
																						}}));
	const [storeStartTime, setStoreStartTime] = useState(data.store_time.length!==0 ? data.store_time[0].open_time : '');
	const [storeEndTime, setStoreEndTime] = useState(data.store_time.length!==0 ? data.store_time[0].close_time : '');

	// Payment methods details...
	const [accountType, setPaymentType] = useState('Individual');
	const [automaticTransfer, setAutomaticTransfer] = useState(false);
	const [cpf, setCpf] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [name, setNane] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [cpfOfRespPerson, setCpfOfRespPerson] = useState('');
	const [nameOfRespPerson, setNaneOfRespPerson] = useState('');
	const [bank, setBank] = useState('');
	const [bank_ag, setBank_ag] = useState('');
	const [bank_type, setBank_type] = useState('');
	const [bank_cc, setBank_cc] = useState('');
	
	const checkAndSetId = async (e) => {
		let val = e.target.value.replace(/[^\w-]/gi, '').toLocaleLowerCase()
		setId(val);
		if (val === data.unique_id) {
			setIdUnique(true);
			return;
		}
		if (!!val) {
			await checkStoreIdentifierAPI(val).then(res => {
				if (res.data.status === 'success') {
					setIdUnique(!res.data.identifierExists);
				} else {
					setIdUnique(false);
				}
			}).catch(err => {
				toast.error(err.message);
				setIdUnique(false);
			})
		} else {
			setIdUnique(false);
		}
	}

	const onStoreLogoChange = (e) => {
		let logo = e.target.files[0];
		if (logo.size / 1024 > 500) {
			setStoreLogoError(t("messages.logoSize"));
			return;
		}
		setStoreLogo(logo);
		setStoreLogoError('');
	}

	const onThemeColorChange = (selectedColor) => {
		var r = document.querySelector(':root');
		r.style.setProperty('--store-primary', selectedColor);
		setStoreThemeColor(selectedColor);
	}

	const onSubmit = async () => {

		let hasErrors = false;

		if(!storeName && !hasErrors){
			toast.error(t("messages.requiredFields.storeName"));
			hasErrors = true;
		}
		if(!storeDesc && !hasErrors){
			toast.error(t("messages.requiredFields.storeDesc"));
			hasErrors = true;
		}
		if(!id && !hasErrors){
			toast.error(t("messages.requiredFields.id"));
			hasErrors = true;
		}
		if(!storeStartTime && !hasErrors){
			toast.error(t("messages.requiredFields.storeStartTime"));
			hasErrors = true;
		}
		if(!storeEndTime && !hasErrors){
			toast.error(t("messages.requiredFields.storeEndTime"));
			hasErrors = true;
		}
		if(accountType==="Individual"){
			if(!cpf && !hasErrors){
				toast.error(t("messages.requiredFields.cpf"));
				hasErrors = true;
			}
			if(!name && !hasErrors){
				toast.error(t("messages.requiredFields.name"));
				hasErrors = true;
			}
		}else{
			if(!cnpj && !hasErrors){
				toast.error(t("messages.requiredFields.cnpj"));
				hasErrors = true;
			}
			if(!companyName && !hasErrors){
				toast.error(t("messages.requiredFields.companyName"));
				hasErrors = true;
			}
			if(!cpfOfRespPerson && !hasErrors){
				toast.error(t("messages.requiredFields.cpfOfRespPerson"));
				hasErrors = true;
			}
			if(!nameOfRespPerson && !hasErrors){
				toast.error(t("messages.requiredFields.nameOfRespPerson"));
				hasErrors = true;
			}
		}
		if(!bank && !hasErrors){
			toast.error(t("messages.requiredFields.bank"));
			hasErrors = true;
		}
		if(!bank_ag && !hasErrors){
			toast.error(t("messages.requiredFields.bank_ag"));
			hasErrors = true;
		}
		if(!bank_type && !hasErrors){
			toast.error(t("messages.requiredFields.bank_type"));
			hasErrors = true;
		}
		if(!bank_cc && !hasErrors){
			toast.error(t("messages.requiredFields.bank_cc"));
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

		if(contactNumbers.length===0 && !hasErrors){
			toast.error(t("messages.requiredFields.contactNumbers"));
			hasErrors = true;
		}

		if(!hasErrors){
			var formData = new FormData();
			formData.append('identifier', id);
			formData.append('storeName', storeName);
			formData.append('logo', storeLogo);
			formData.append('description', storeDesc);
			formData.append('themeColor', storeThemeColor);
			formData.append('addresses', JSON.stringify(addresses));
			formData.append('contactNumbers', JSON.stringify(contactNumbers));
			formData.append('storeStartTime', storeStartTime);
			formData.append('storeEndTime', storeEndTime);

			formData.append('accountType', accountType);
			formData.append('automaticTransfer', automaticTransfer);
			formData.append('cpf', cpf);
			formData.append('cnpj', cnpj);
			formData.append('name', name);
			formData.append('companyName', companyName);
			formData.append('cpfOfRespPerson', cpfOfRespPerson);
			formData.append('nameOfRespPerson', nameOfRespPerson);
			formData.append('bank', bank);
			formData.append('bank_ag', bank_ag);
			formData.append('bank_type', bank_type);
			formData.append('bank_cc', bank_cc);

			await updateStoreSettingsApi(formData).then(res=>{
				if(res.data.status === 'success'){
					if(language==='pt') toast.error(res.data.message.pt);
					else toast.success(res.data.message.en);
					if(res.data.productsCount===0){
						setTimeout(()=>{
							navigate("/my-store/import-products");
						},1000)
					}
				}
				else{
					if(language==='pt') toast.error(res.data.error.pt);
					else toast.error(res.data.error.en);
				}
			}).catch(err=>toast.error(err.message));
		}
	}

	useEffect(() => {
		// onThemeColorChange('#fb9f6a');
		return (() => {
			let storeThemeColor = localStorage.getItem('store_theme_color');
			if (!!storeThemeColor && storeThemeColor !== 'null' && storeThemeColor !== 'undefined') {
				onThemeColorChange(storeThemeColor);
			} else {
				onThemeColorChange('#fb9f6a');
			}
		})
	}, [])


	return (
		<div className='StoreSettings'>
			<div>
				<label htmlFor='StoreSettings-store-id-input' className='StoreSettings-store-id-input-text'>
					<p className='StoreSettings-store-id-input-text1 StoreSettings-input-label'>{t("input-labels.identifier")}</p>
					<p className='StoreSettings-question-mark' onClick={() => setStoreIdHelpText(!storeIdHelpText)}>?</p>
				</label>
				{storeIdHelpText && <p className='StoreSettings-help-text'>
					<b> {t("helper-text.identifier.line1")}</b> <br />
						{t("helper-text.identifier.line2-1")} <b>"{t("helper-text.identifier.line2-2")}"</b>
						{t("helper-text.identifier.line3")} <br />
					<b>"{t("helper-text.identifier.line4")}"</b>, <br />
					<b>"{t("helper-text.identifier.line5")}"</b> <br />
					<b>"{t("helper-text.identifier.line6")}"</b> <br />
						{t("helper-text.identifier.line7")} <br />
					<b>"{t("helper-text.identifier.line8")}"</b>, <br />
					<b>"{t("helper-text.identifier.line9")}"</b> <br />
					<b>"{t("helper-text.identifier.line10")}"</b> <br />
						{t("helper-text.identifier.line11")}
				</p>}
				<code className='StoreSettings-store-id-input-p'>https://golive.store/
					<input
						id='StoreSettings-store-id-input'
						value={id}
						onChange={checkAndSetId}
						disabled={true}
					/>
				</code>
				{!!id && isIdUnique && id !== data.unique_id && <p className='StoreSettings-unique-id-message text-success'>
					{t("messages.uniqueId")}
				</p>}

				{!!id && !isIdUnique && id !== data.unique_id && <p className='StoreSettings-unique-id-message text-danger'>
					{t("messages.uniqueId2", {"id": id})}
				</p>}

			</div>

			<div className='StoreSettings-input-div'>
				<label className='StoreSettings-input-label' htmlFor='StoreSettings-store-name-input'>
					{t("input-labels.storeName")}
				</label> <br />
				<input
					id='StoreSettings-store-name-input'
					value={storeName}
					onChange={e => {
						if (e.target.value.length < 99) {
							setStoreName(e.target.value);
							setStoreNameError('');
						} else {
							setStoreNameError(t("messages.storeName.moreCharThanLimit"));
						}
					}}
				/>
				{!!storeNameError && <p className='StoreSettings-unique-id-message text-danger'>{storeNameError}</p>}
			</div>

			<div className='StoreSettings-input-div'>
				<h4 className='StoreSettings-input-label StoreSettings-flex-inline'>{t("input-labels.logo")} <p className='StoreSettings-question-mark' onClick={() => setStoreLogoHelpText(!storeLogoHelpText)}>?</p> </h4>
				{storeLogoHelpText && <p className='StoreSettings-help-text'>
					{t("helper-text.logo")}
				</p>}
				<label className='StoreSettings-input-label' htmlFor='StoreSettings-store-logo-input'>
					<h3 className='Create-store-file-input-label'>{t("button-text.logo")}</h3>
				</label>
				<input
					id='StoreSettings-store-logo-input'
					type='file'
					accept="image/png, image/jpeg"
					// value={storeLogo}
					onChange={onStoreLogoChange}
				/>
				{storeLogoError && <p className='StoreSettings-unique-id-message text-danger'>{storeLogoError}</p>}
				<div className="Create-store-file-input-preview">
					{(!!storeLogo || !!data.store_logo) ? <img
						src={!!storeLogo ? URL.createObjectURL(storeLogo) : data.store_logo}
						alt="logo"
					/> : <p>
						{t("logo-preview-text")}
					</p>}
				</div>
			</div>

			<div className='StoreSettings-input-div'>
				<label className='StoreSettings-input-label' htmlFor='StoreSettings-store-desc-input'>
					{t("input-labels.description")}
				</label> <br />
				<textarea
					id='StoreSettings-store-desc-input'
					rows='5'
					value={storeDesc}
					onChange={e => { e.target.value.length < 700 ? setStoreDesc(e.target.value) : setStoreDescError(true) }}
				></textarea>
				{storeDescError && <p className='StoreSettings-unique-id-message text-danger'>{t("messages.description.moreCharThanLimit")}</p>}
			</div>

			<div className='StoreSettings-input-div'>
				<div className='StoreSettings-store-color-input-label-div'>
					<label className='StoreSettings-input-label' htmlFor='StoreSettings-store-color-input'>
						{t("input-labels.theme-color")}
					</label>
					<p className='StoreSettings-question-mark' onClick={() => setStoreThemeColorHelpText(!storeThemeColorHelpText)}>?</p>
				</div>
				{storeThemeColorHelpText && <p className='StoreSettings-help-text'>
					{t("helper-text.theme-color")}
				</p>}
				<input
					id='StoreSettings-store-color-input'
					type='color'
					value={storeThemeColor}
					onChange={e => onThemeColorChange(e.target.value)}
				/>
			</div>
			<hr />
			<div className='StoreSettings-input-div'>
				<AddressInputList 
					addresses={addresses}
					setAddresses={setAddresses}
					primaryColor='var(--store-primary)'
				/>
			</div>
			<hr />
			<div className='StoreSettings-input-div'>
				<PhoneInputList
					phoneNumbers={contactNumbers}
					setPhoneNumbers={setContactNumbers}
					primaryColor='var(--store-primary)'
				/>
			</div>
			<hr />
			<div className='StoreSettings-input-div StoreSettings-storeTiming'>
				<div>
					<label className='StoreSettings-input-label' htmlFor='StoreSettings-store-start-time-input'>
						{t("input-labels.start-time")}
					</label><br/>
					<input
						id='StoreSettings-store-start-time-input'
						placeholder={t("placeholder.start-time")}
						value={storeStartTime}
						onChange={e => setStoreStartTime(e.target.value)}
					/>
				</div>
				<div>
					<label className='StoreSettings-input-label' htmlFor='StoreSettings-store-end-time-input'>
						{t("input-labels.end-time")}
					</label><br/>
					<input
						id='StoreSettings-store-end-time-input'
						placeholder={t("placeholder.end-time")}
						value={storeEndTime}
						onChange={e => setStoreEndTime(e.target.value)}
					/>
				</div>
			</div>
			<hr />
			
			<h4 className='StoreSettings-payment-head'>{t("payment-head")}</h4>
			<div className='StoreSettings-input-div'>
				<div className='StoreSettings-input-div StoreSettings-storeTiming'>
					<div>
						<label className='PhoneInputList-sub-input-label'>
							{t("payment.account-type")}
						</label><br />
						<select
							className='StoreSettings-input-label'
							name='account-type'
							value={accountType}
							onChange={e => setPaymentType(e.target.value)}
						>
							<option value="Individual">{t("payment.account-type-select.individual")}</option>
							<option value="Legal Entity">{t("payment.account-type-select.legal-entity")}</option>
						</select>
					</div>
					<div>
						<label className='PhoneInputList-sub-input-label'>
							{t("payment.autoTrasfer")}
						</label><br />
						<select
							className='StoreSettings-input-label'
							name='auto-transfer'
							value={automaticTransfer}
							onChange={e => setAutomaticTransfer(e.target.value)}
						>
							<option value={true}>{t("payment.autoTrasfer-select.true")}</option>
							<option value={false}>{t("payment.autoTrasfer-select.false")}</option>
						</select>
					</div>
				</div>
				<div className='StoreSettings-input-div StoreSettings-storeTiming'>
					{accountType==="Individual"? 
						<div>
							<label className='PhoneInputList-sub-input-label'>
								{t("payment.cpf")}
							</label><br/>
							<input
								placeholder={t("payment.cpf-placeholder")}
								value={cpf}
								onChange={e => setCpf(e.target.value)}
							/>
						</div>
					:
						<div>
							<label className='PhoneInputList-sub-input-label'>
								{t("payment.cnpj")}
							</label><br/>
							<input
								placeholder={t("payment.cnpj-placeholder")}
								value={cnpj}
								onChange={e => setCnpj(e.target.value)}
							/>
						</div>
					}
					{accountType==="Individual"? 
						<div>
							<label className='PhoneInputList-sub-input-label'>
								{t("payment.name")}
							</label><br/>
							<input
								placeholder={t("payment.name-placeholder")}
								value={name}
								onChange={e => setNane(e.target.value)}
							/>
						</div>
					:
						<div>
							<label className='PhoneInputList-sub-input-label'>
								{t("payment.company-name")}
							</label><br/>
							<input
								placeholder={t("payment.company-name-placeholder")}
								value={companyName}
								onChange={e => setCompanyName(e.target.value)}
							/>
						</div>
					}
				</div>
				{accountType !== "Individual" && <>
					<div className='StoreSettings-input-div StoreSettings-storeTiming'>
						<div>
							<label className='PhoneInputList-sub-input-label'>
								{t("payment.nameOfRespPerson")}
							</label><br/>
							<input
								placeholder={t("payment.nameOfRespPerson-placeholder")}
								value={nameOfRespPerson}
								onChange={e => setNaneOfRespPerson(e.target.value)}
							/>
						</div>
						<div>
							<label className='PhoneInputList-sub-input-label'>
								{t("payment.cpfOfRespPerson")}
							</label><br/>
							<input
								placeholder={t("payment.cpfOfRespPerson-placeholder")}
								value={cpfOfRespPerson}
								onChange={e => setCpfOfRespPerson(e.target.value)}
							/>
						</div>
					</div>
					<h6 className='StoreSettings-payment-address'>{t("payment.responsible-person-note")}</h6>
				</>}
				<div className='StoreSettings-input-div StoreSettings-storeTiming'>
					<div>
						<label className='PhoneInputList-sub-input-label'>
							{t("payment.bank")}
						</label><br/>
						<input
							placeholder={t("payment.bank-placeholder")}
							value={bank}
							onChange={e => setBank(e.target.value)}
						/>
					</div>
					<div>
						<label className='PhoneInputList-sub-input-label'>
							{t("payment.bank_ag")}
						</label><br/>
						<input
							placeholder={t("payment.bank_ag-placeholder")}
							value={bank_ag}
							onChange={e => setBank_ag(e.target.value)}
						/>
					</div>
				</div>
				<div className='StoreSettings-input-div StoreSettings-storeTiming'>
					<div>
						<label className='PhoneInputList-sub-input-label'>
							{t("payment.bank_type")}
						</label><br/>
						<input
							placeholder={t("payment.bank_type-placeholder")}
							value={bank_type}
							onChange={e => setBank_type(e.target.value)}
						/>
					</div>
					<div>
						<label className='PhoneInputList-sub-input-label'>
							{t("payment.bank_cc")}
						</label><br/>
						<input
							placeholder={t("payment.bank_cc-placeholder")}
							value={bank_cc}
							onChange={e => setBank_cc(e.target.value)}
						/>
					</div>
				</div>
			<h6 className='StoreSettings-payment-address'>{t("payment.address-note")}</h6>
		</div>
			<hr />
			<div className='StoreSettings-input-div'>
				<button
					className='store-submit-button1 w-100'
					onClick={onSubmit}
				>{t("button-text.save")}</button>
			</div>
		</div>
	)
}

export default StoreSettings