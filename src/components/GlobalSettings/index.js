import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData } from 'react-router-dom';
import { getUserGeneralSettingsAPI, settUserGeneralSettingsAPI } from '../../apis/common';
import './style.css';


const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async () => {
    let data = null;
    await getUserGeneralSettingsAPI().then(res => {
        if (res.data.status === "success") {
            data = res.data.data;
        } else toast.error(res.data.error[language])
    }).catch(err => toast.error(err.massage));
    if (!!data) return { data };
    return redirect("/");
}

function GlobalSettings() {
    const [t, i18n] = useTranslation('globalSettings');
    const { data } = useLoaderData();

    const [lang, setLang] = useState(data.language);
    const [currency, setCurrency] = useState(data.currency);
    const [dateFormat, setDateFormat] = useState(data.dateFormat);

    const onSubmit = async () => {
        if(!lang){
            toast.error(t('errors.lang'));
            return;
        }
        if(!currency){
            toast.error(t('errors.currency'));
            return;
        }
        if(!dateFormat){
            toast.error(t('errors.dateFormat'));
            return;
        }

        let payloads = {
            "language": lang,
            currency,
            dateFormat
        }

        await settUserGeneralSettingsAPI(payloads).then(res=>{
            if(res.data.status === "success"){
                toast.success(res.data.message[language]);
                localStorage.setItem('lang', lang);
                localStorage.setItem('currentStoreCurrency', currency);
                localStorage.setItem('currentStoreDateFormat', dateFormat);
                i18n.changeLanguage(lang);
            } else toast.error(res.data.error[language]);
        }).catch(err=>toast.error(err.message));

    }

    return (
        <div className='GlobalSettings'>
            <div className='GlobalSettings-inline-inputs'>
                <div className='GlobalSettings-inline-inputs2'>
                    <label className='GlobalSettings-sub-input-label'>
                        {t("input-labels.lang")}
                    </label><br />
                    <select
                        className='GlobalSettings-type-input'
                        name='lang'
                        value={lang}
                        onChange={e => setLang(e.target.value)}
                    >
                        <option value="">{t("select-options.empty")}</option>
                        <option value="en">{t("select-options.lang.en")}</option>
                        <option value="pt">{t("select-options.lang.pt")}</option>
                    </select>
                </div>
                <div className='GlobalSettings-inline-inputs2'>
                    <label className='GlobalSettings-sub-input-label'>
                        {t("input-labels.currency")}
                    </label><br />
                    <select
                        className='GlobalSettings-type-input'
                        name='currency'
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                    >
                        <option value="">{t("select-options.empty")}</option>
                        <option value="R$">{t("select-options.currency.R$")}</option>
                        <option value="Rs.">{t("select-options.currency.INR")}</option>
                        <option value="$">{t("select-options.currency.USD")}</option>
                    </select>
                </div>
                <div className='GlobalSettings-inline-inputs2'>
                    <label className='GlobalSettings-sub-input-label'>
                        {t("input-labels.dateFormat")}
                    </label><br />
                    <select
                        className='GlobalSettings-type-input'
                        name='dateFormat'
                        value={dateFormat}
                        onChange={e => setDateFormat(e.target.value)}
                    >
                        <option value="">{t("select-options.empty")}</option>
                        <option value="MM/DD/YYYY$">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    </select>
                </div>
            </div>
            <hr />
			<div className='UserAccount-input-div'>
				<button
					className='user-submit-button1 w-100'
					onClick={onSubmit}
				>{t("button-text.save")}</button>
			</div>
        </div>
    )
}

export default GlobalSettings