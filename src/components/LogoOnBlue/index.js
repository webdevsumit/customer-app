import React from 'react';
import './style.css';
// import FallingStart from './../FallingStars';

function LogoOnBlue({
        bgColor = 'var(--user-primary)',
    }) {
    return (
        <div className='LogoOnBlue' style={{ backgroundColor: bgColor }}>
            {/* <FallingStarts /> */}
            <div className='LogoOnBlue-head' style={{ backgroundColor: bgColor }}>
                <img className='LogoOnBlue-logo' src='/assets/svgs/logo.svg' alt='logo' />
            </div>
        </div>
    )
}

export default LogoOnBlue