import React from 'react';
import './style.css';

function LogoOnBlue() {

    // let userThemeColor = "rgba(0,0,0,0.5)";
    let userThemeColor = localStorage.getItem('user_theme_color');
    if(!(!!userThemeColor && userThemeColor!=='null' && userThemeColor!=='undefined')) {
        userThemeColor = "rgba(0,0,0,0.5)"
    }
    let logo = localStorage.getItem('store_logo');
    if(!logo || logo === "null") logo ="/assets/svgs/logo.svg";

    return (
        <div className='LogoOnBlue' style={{ backgroundColor: userThemeColor }}>
            <div className='LogoOnBlue-head' style={{ backgroundColor: userThemeColor }}>
                <img className='LogoOnBlue-logo' src={logo} alt='logo' />
            </div>
        </div>
    )
}

export default LogoOnBlue