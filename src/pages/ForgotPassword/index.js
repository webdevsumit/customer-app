import React, { useState } from 'react'
import './style.css'
import NormalInput from '../../components/commons/NormalInput';
import NormalButton1 from '../../components/commons/NormalButton1';
import { sendOtpOnMailApi, resetPasswordApi } from '../../apis/common';
import toast from 'react-hot-toast';
import SLFContainer2 from '../../components/commons/SLFContainer2';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {

	const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
	const [t, ] = useTranslation('forgotPassword');

	const [email, setEmail] = useState("");
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");

	const chagnePassword = async () => {
		if(!email || !password || !otp){
			toast.error(t("errors.emptyFields"));
			return;
		}

		let payloads = {
			email,
			otp,
			password
		}

		await resetPasswordApi(payloads).then(res=>{
			if(res.data.status === "success"){
				toast.success(t("errors.success"));
				setTimeout(()=>{
					window.location.href = '/login/';
				},2000)
			}else{
				toast.error(res.data.error.en);
			}
		}).catch(err=>toast.error(err.message));
	}

	const sendOtp = async () => {

		if(!email){
			toast.error(t("errors.emptyFields"));
			return;
		}

		let payloads = {
			email,
		}

		await sendOtpOnMailApi(payloads).then(res=>{
			if(res.data.status === "success"){
				setIsOtpSent(true);
				toast.success(t("errors.otp-sent"));
			}else{
				if(language==='pt') toast.error(res.data.error.pt);
				else toast.success(res.data.error.en);
			}
		}).catch(err=>toast.error(err.message));

	}

	const handleEmailChange = (event) => {
		let tempVal = event.target.value;
		setEmail(tempVal.trim())
	}

	return (
		<div className='ForgotPassword'>
			{/* <FallingStarts /> */}
			<div className='ForgotPassword-main'>
				<div className='ForgotPassword-container1'>

					
					{!isOtpSent?<>
						<NormalInput 
							placeholder={t("ForgotPassword-container-input-placeholder.email")}
							type='email'
							value={email}
							onChange={handleEmailChange}
							classNames="ForgotPassword-input-box-length"
						/>

						<NormalButton1
							label={t("button.send-otp")}
							classNames='ForgotPassword-ForgotPassword-button'
							onClick={sendOtp}
						/>
					</>:<>
						
						<h4 className='ForgotPassword-back-button' onClick={()=>setIsOtpSent(false)}>
								<img src='/assets/svgs/arrow.svg' alt='back' />
								{t("button.back")}
							</h4>

						<NormalInput 
							placeholder={t("ForgotPassword-container-input-placeholder.otp")}
							value={otp}
							onChange={e=>setOtp(e.target.value)}
							classNames="ForgotPassword-input-box-length"
							type='number'
						/>

						<NormalInput 
							placeholder={t("ForgotPassword-container-input-placeholder.password")}
							classNames="ForgotPassword-input-box-length"
							type={t("ForgotPassword-container-input-placeholder.new-password")}
							value={password}
							onChange={e=>setPassword(e.target.value)}
						/>

						<NormalButton1
							label={t("button.submit")}
							classNames='ForgotPassword-ForgotPassword-button'
							onClick={chagnePassword}
						/>
					</>}

					<h5 className='ForgotPassword-login-button'>{t("ForgotPassword-login-text")}<a href='/login'>{t("button.login")}</a></h5>
					<h5 className='ForgotPassword-login-button2'><a href='/termsAndConditions'>{t("button.t-and-c")}</a></h5>
				</div>
				<SLFContainer2 />
			</div>
		</div>
	)
}

export default ForgotPassword