import React from 'react';
import './style.css';

function FlashScreen() {

    // let userThemeColor = "rgba(0,0,0,0.5)";
    let userThemeColor = localStorage.getItem('user_theme_color');
    if(!(!!userThemeColor && userThemeColor!=='null' && userThemeColor!=='undefined')) {
        userThemeColor = "rgba(0,0,0,0.5)"
    }
    let logo = localStorage.getItem('store_logo');
    if(!logo || logo === "null") logo ="/assets/svgs/logo.svg";

    return (
        <div className='FlashScreen' style={{ backgroundColor: userThemeColor }}>
            <div className='FlashScreen-head' style={{ backgroundColor: userThemeColor }}>
                <img className='FlashScreen-logo' src={logo} alt='logo' />
            </div>
        </div>
    )
}

export default FlashScreen