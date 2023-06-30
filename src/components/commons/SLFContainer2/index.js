import React from 'react';
import { useTranslation } from 'react-i18next';
import "./style.css";

function SLFContainer2() {
    const [t, ] = useTranslation('SLFContainer2');
    return (
        <div className='SLFContainer2-container2'>
            <img className='SLFContainer2-container2-logo' src='/assets/svgs/logo.svg' alt='logo' />
            <h4 className='SLFContainer2-container2-main-text' >
                {t("main-text.line1")} <br />
                {t("main-text.line2")}
            </h4>
            <ul className='SLFContainer2-container2-buller-points'>
                <li>
                    {t("bullet-points.line1")}
                </li>
                <li>
                    {t("bullet-points.line2")}
                </li>
                <li>
                    {t("bullet-points.line3")}
                </li>
                <li>
                    {t("bullet-points.line4")}
                </li>
                <li>
                    {t("bullet-points.line5")}
                </li>
            </ul>
        </div>
    )
}

export default SLFContainer2