import React from 'react';
import './style.css';

function LogoOnBlue({
        bgColor = 'var(--user-primary)',
    }) {
    
    let logo = localStorage.getItem('store_logo');
    if(!logo || logo === "null") logo ="/assets/svgs/logo.svg";
    return (
        <div className='LogoOnBlue' style={{ backgroundColor: bgColor }}>
            <div className='LogoOnBlue-head' style={{ backgroundColor: bgColor }}>
                <img className='LogoOnBlue-logo' src={logo} alt='logo' />
            </div>
        </div>
    )
}

export default LogoOnBlue