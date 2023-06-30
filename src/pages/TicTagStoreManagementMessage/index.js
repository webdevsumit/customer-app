import React from 'react';
import { useTranslation } from 'react-i18next';
import { tictagUrl } from '../../apis/tictag';
import './style.css';

function TicTagStoreManagementMessage() {
    const [t, ] = useTranslation('ticTagStoreManagementMessage');
    return (
        <div className='TicTagStoreManagementMessage'>
            <h2>{t("notice")}</h2>
            <p>{t("line1")}</p>
            <a className='store-submit-button1' href={tictagUrl} target="blank">{t("button")}</a>
        </div>
    )
}

export default TicTagStoreManagementMessage