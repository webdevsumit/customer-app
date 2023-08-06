import React, { useEffect, useState } from 'react'
import { 
    redirect,
    Outlet, 
    useLocation,
    useLoaderData,
    useNavigate
} from 'react-router-dom';
import { checkAndSetUserAPI } from '../../apis/common';
import FlashScreen from '../FlashScreen';
import UserNavbar from '../UserNavbar';
import './style.css';
import TopBar from '../TopBar';
import UserSidebar from '../UserSidebar';
import { toast } from 'react-hot-toast';

export async function loader({ params }) {
    localStorage.setItem("storeId", params.storeId);
    let isAuthenticated = false;
    await checkAndSetUserAPI(params.storeId).then((res) => {
        if(res.data.status === 'success'){
            localStorage.setItem("notifications_count", res.data.notifications_count);
            localStorage.setItem("products_in_bag_count", res.data.products_in_bag_count);
            localStorage.setItem("store_logo", res.data.store_logo);
            localStorage.setItem("user_theme_color", res.data.store_theme_color);
            localStorage.setItem("lng", res.data.store_language);
            localStorage.setItem('currentStoreCurrency', res.data.store_currency_sign);
            localStorage.setItem('currentStoreDateFormat', res.data.store_dateFormat);
            localStorage.setItem('showBrandOnApp', res.data.showBrandOnApp);
            localStorage.setItem('showSizeOnApp', res.data.showSizeOnApp);
            isAuthenticated = true;
        }
    }).catch(err => toast.error(err.message));

    if(isAuthenticated) return {storeId: params.storeId};
    return redirect(`/${params.storeId}/signup`);
}

function Auth() {
    const { storeId } = useLoaderData();
    let location = useLocation();
    let navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let userThemeColor = localStorage.getItem('user_theme_color');
        var r = document.querySelector(':root');
        if(!!userThemeColor && userThemeColor!=='null' && userThemeColor!=='undefined') {
		    r.style.setProperty('--user-primary', userThemeColor);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        // eslint-disable-next-line
    }, [])

    if (isLoading) return (<FlashScreen />);
    
    if(location.pathname === `/${storeId}` || location.pathname === `/${storeId}/`)
        return navigation(`/${storeId}/list`);

    return (
        <div>
            <header className='Auth-extra-space-for-top-bar'>
                <TopBar />
            </header>
            <main className='Auth-main-content'>
                <div className='Auth-main-content-left-container'>
                    <UserSidebar />
                </div>
                <div className='Auth-main-content-main-container'>
                    <Outlet />
                </div>
                <div className='Auth-main-content-right-container'>

                </div>
            </main>
            <nav className='Auth-extra-space-for-navigation-bar'>
                <UserNavbar />
            </nav>
        </div>
    );
}

export default Auth;