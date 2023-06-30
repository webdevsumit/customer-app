import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { saveTicTagInfoAPI } from '../../../apis/common';
import { confirmIntegrationOfTictagAPI, confirmIntegrationOfTictagWithStoreSelectionAPI, sendOtpToIntegrateAPI } from '../../../apis/tictag';
import NormalInput from '../../commons/NormalInput';
import NormalSelect from '../../commons/NormalSelect';
import './style.css';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

function TictagIntegration() {
    let storeId = localStorage.getItem('store_id')
    const [t, ] = useTranslation('tictagIntegration');
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpId, setOtpId] = useState('');
    const [ticTagStoreId, setTicTagStoreId] = useState('');

    const [usersMultipleTicTagStores, setUsersMultipleTicTagStores] = useState(null);

    const onSendOtpBtnClick = async () => {
        let payloads = {email, password, storeId, language};
        await sendOtpToIntegrateAPI(payloads).then(res=>{
            setOtpId(res.data.otpId);
            setIsOtpSent(true);
        }).catch(err=>toast.error(err.message));
    }

    const onSubmitForm = async () => {
        let payloads = {email, password, otp, storeId, otpId, language};
        await confirmIntegrationOfTictagAPI(payloads).then(res=>{
            if(res.data.hasMultipleStores){
                setUsersMultipleTicTagStores(res.data.stores)
            }else{
                afterSuccessfullIntegration(res.data);
            }
        }).catch(err=>toast.error(err.message));
    }

    const onStoreSelect = async () => {
        let payloads = {email, password, otp, storeId, otpId, language, ticTagStoreId};
        await confirmIntegrationOfTictagWithStoreSelectionAPI(payloads).then(res=>{
            if(res.data.hasMultipleStores){
                setUsersMultipleTicTagStores(res.data.stores)
            }else{
                afterSuccessfullIntegration(res.data);
            }
        }).catch(err=>toast.error(err.message));
    }

    const afterSuccessfullIntegration = async (data) => {
        await saveTicTagInfoAPI({infoId:data.infoId, userToken: data.userToken}).then(res=>{
            if(res.data.status === "success"){
                toast.success(res.data.message[language])
                setTimeout(()=>{
                    history('/my-store/import-products');
                },300);
            }else toast.success(res.data.error[language]);
        }).catch(err=>toast.error(err.message));
    }

    return (
        <div className='TictagIntegration'>
            <p className='TictagIntegration-upper-note'>{t("notes.p1")}</p>
            <p className='TictagIntegration-upper-note'>{t("notes.p2")}</p>
            <div className='TictagIntegration-input-div'>
                {!isOtpSent?<>
                    <label className='TictagIntegration-input-div-label'>{t("labels.email")}</label>
                    <NormalInput
                        value={email}
                        type="email"
                        onChange={e=>setEmail(e.target.value)}
                        placeholder={t("placeholders.email")}
                    />
                    <label className='TictagIntegration-input-div-label'>{t("labels.password")}</label>
                    <NormalInput
                        value={password}
                        type="password"
                        onChange={e=>setPassword(e.target.value)}
                        placeholder={t("placeholders.password")}
                    />
                    <p className='store-submit-button1' onClick={onSendOtpBtnClick}>{t("btns.otp")}</p>
                </>:<>
                    {!!usersMultipleTicTagStores?<>
                        <label className='TictagIntegration-input-div-label'>{t("labels.otp")}</label>
                        <NormalSelect
                            value={ticTagStoreId}
                            onChange={e=>setTicTagStoreId(e.target.value)}
                            placeholder={t("placeholders.store")}
                            options={usersMultipleTicTagStores.map(ts=>{return{label: ts.store_name, value: ts.id}})}
                        />
                        <p className='store-submit-button1' onClick={onStoreSelect}>{t("btns.continue")}</p>
                    </>:<>
                        <label className='TictagIntegration-input-div-label'>{t("labels.otp")}</label>
                        <NormalInput
                            value={otp}
                            onChange={e=>setOtp(e.target.value)}
                            placeholder={t("placeholders.otp")}
                        />
                        <p className='store-submit-button1' onClick={onSubmitForm}>{t("btns.submit")}</p>
                    </>}
                </>}
            </div>
        </div>
    )
}

export default TictagIntegration