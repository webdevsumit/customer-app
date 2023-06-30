import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import FallingStarts from '../../components/FallingStars';
import './style.css';
import { Link, useLoaderData } from 'react-router-dom';


export async function loader({ params }) {
	let storeId = params.storeId;
    return ({ storeId });
}

function Landing() {

    const [t, ] = useTranslation('landing');
    const { storeId } = useLoaderData();

    // useEffect(()=>{
    //     let tLng = localStorage.getItem('lng');
	// 	if(!tLng) tLng = 'en';
    //     // eslint-disable-next-line
    // },[])

    return (<div className='Landing'>
                <FallingStarts />
                <nav className='Landing-nav'>
                    <h5 className='Landing-nav-login-button'> <Link to={`/${storeId}/signup`}>{t("button.signup").toUpperCase()}</Link></h5>
                    <h5 className='Landing-nav-login-button'> <Link to={`/${storeId}/login`}>{t("Landing-nav-login.label").toUpperCase()}</Link></h5>
                </nav>
            </div>
    )
}

export default Landing;