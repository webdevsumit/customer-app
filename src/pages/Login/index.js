import React, { useState } from 'react'
import './style.css'
import NormalInput from '../../components/commons/NormalInput';
import NormalButton1 from '../../components/commons/NormalButton1';
import { loginApi } from '../../apis/common';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData } from 'react-router-dom';


export async function loader({ params }) {
	let storeId = params.storeId;
    return ({ storeId });
}

function Login() {

	const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
	const [t, ] = useTranslation('login');
	const { storeId } = useLoaderData();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const doLogin = async () => {
		if(isLoading) return;
		if(!username || !password){
			toast.error(t("errors.emptyFields"));
			return;
		}

		let payloads = {
			username,
			password
		}
		setIsLoading(true);
		await loginApi(payloads, storeId).then(res=>{
			if(res.data.status === "success"){
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('storeId', storeId);
				window.location.href = `/${storeId}`;
			}else{
				if(language==='pt') toast.error(res.data.error.pt);
				else toast.error(res.data.error.en);
			}
		}).catch(err=>toast.error(err.message));
		setIsLoading(false);
	}

	const handleUsernameChange = (event) => {
		let tempVal = event.target.value.toLowerCase();
		setUsername(tempVal.replace(/ /g,""))
	}

	return (
		<div className='Login'>
			{/* <FallingStarts /> */}
			<div className='Login-main'>
				<div className='Login-container1'>

					<NormalInput 
						placeholder={t("Login-container-input-placeholder.email")}
						type='text'
						value={username}
						onChange={handleUsernameChange}
						classNames="Login-input-box-length"
					/>
					<NormalInput 
						placeholder={t("Login-container-input-placeholder.password")}
						classNames="Login-input-box-length"
						type='password'
						value={password}
						onChange={e=>setPassword(e.target.value)}
					/>

					<NormalButton1
						label={isLoading ? "...WAIT..." : t("button.login") }
						classNames='Login-Login-button'
						onClick={doLogin}
					/>

					<h5 className='Login-login-button'>{t("Login-signup-text")} <Link to={`/${storeId}/signup`}>{t("button.signup")}</Link></h5>
					<h5 className='Login-login-button2'><Link to={`/${storeId}/forgot-password`}>{t("button.fortgot-password")}</Link></h5>
				</div>
			</div>
		</div>
	)
}

export default Login