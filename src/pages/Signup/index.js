import React, { useState } from 'react'
import './style.css'
import NormalInput from '../../components/commons/NormalInput';
import NormalButton1 from '../../components/commons/NormalButton1';
import { signupApi } from '../../apis/common';
import {useTranslation} from "react-i18next";
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
	let storeId = params.storeId;
    return ({ storeId });
}

function Signup() {

	const [t, ] = useTranslation('signup');
	const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
	const { storeId } = useLoaderData();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [country, ] = useState("India");

	const doSignup = async () => {
		if(!username || !email || !password){
			toast.error(t("errors.emptyFields"));
			return;
		}

		let payloads = {
			username,
			email,
			password,
			language,
			country
		}

		await signupApi(payloads, storeId).then(res=>{
			if(res.data.status === "success"){
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('storeId', storeId);
				window.location.href = `/${storeId}`;
			}else{
				if(language==='pt') toast.error(res.data.error.pt);
				else toast.error(res.data.error.en);
			}
		}).catch(err=>toast.error(err.message));
	}

	const changeUserName = (event) => {
		let tempVal = event.target.value.toLowerCase();
		setUsername(tempVal.replace(/ /g,""))
	}

	const handleEmailChange = (event) => {
		let tempVal = event.target.value;
		setEmail(tempVal.trim())
	}

	return (
		<div className='Signup'>
			<div className='Signup-main'>
				<div className='Signup-container1'>

					<NormalInput 
						placeholder={t("Signup-container-input-placeholder.username")}
						value={username}
						onChange={changeUserName}
						classNames="Signup-input-box-length"
						type='text'
					/>
					<NormalInput 
						placeholder={t("Signup-container-input-placeholder.email")}
						type='email'
						value={email}
						onChange={handleEmailChange}
						classNames="Signup-input-box-length"
					/>
					<NormalInput 
						placeholder={t("Signup-container-input-placeholder.password")}
						classNames="Signup-input-box-length"
						type='password'
						value={password}
						onChange={e=>setPassword(e.target.value)}
					/>


					{/* <div className='Signup-country-select-div Signup-input-box-length'>
						<select
							className='Signup-input-box-length'
							name='country'
							value={country}
							onChange={e => setCountry(e.target.value)}
						>
							<option disabled="true" value="">{t("Signup-container-input-placeholder.select-country")}</option>
							<option value="Brazil">{tAddressInputList("countries.Brazil")}</option>
							<option value="India">{tAddressInputList("countries.India")}</option>
							<option value="United States">{tAddressInputList("countries.United-States")}</option>
						</select>
						<p>{t("country-note")}</p>
					</div> */}

					<NormalButton1
						label={t('button.signup')}
						classNames='Signup-Signup-button'
						onClick={doSignup}
					/>

					<h5 className='Signup-login-button'>{t('Signup-login-text')} <Link to={`/${storeId}/login`}>{t('button.login')}</Link></h5>
					<h5 className='Signup-login-button2'><Link to={`/${storeId}/termsAndConditions`}>{t('button.t-and-c')}</Link></h5>
					<h5 className='Signup-login-button2'><Link to={`/${storeId}/privacyPolicy`}>{t('button.privacy-policy')}</Link></h5>
				</div>
			</div>
		</div>
	)
}

export default Signup