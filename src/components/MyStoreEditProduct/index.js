import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { getProductDetailsToEditByIdAPI, setProductDetailsByIdAPI } from '../../apis/common';
import './style.css';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async ({ params }) => {
    let data;
    let statusOptions;
    await getProductDetailsToEditByIdAPI(params.productId).then(res => {
        data = res.data.data;
        statusOptions = res.data.statusOptions;
    }).catch(err => toast.error(err.message))
    if (!!data) return { "data": data, "statusOptions": statusOptions, "productId": params.productId };
    return redirect('/my-store/menu/manage-products/');
}

function MyStoreEditProduct() {

    const [t, ] = useTranslation('myStoreEditProduct');
    const history = useNavigate();
    const { data, statusOptions, productId } = useLoaderData();

    // FIELDS....
    const [name, setName] = useState(data.name);
    const [nameError, setNameError] = useState('');
    const [description, setDescription] = useState(data.description);
    const [descError, setDescError] = useState(false);
    const [status, setStatus] = useState(data.status.id);
    const [priceInCent, setPriceInCent] = useState(data.price_in_cent);
    const [promoPriceInCent, setPromoPriceInCent] = useState(data.promotional_price_in_cent);
    const [isPromoApplied, setIsPromoApplied] = useState(data.is_promotional_price_applied);
    const [size, setSize] = useState(data.size?.size);
    const [subCategory, setSubCategory] = useState(data.sub_category?.category);
    const [brand, setBrand] = useState(data.brand?.brand);
    const [rankByStore, setRankByStore] = useState(data.rank_by_store)
    const [quantity, setQuantity] = useState(data.quantity);

    const [isClosing, setIsClosing] = useState(false);
    const onClosing = () => {
        setIsClosing(true);
        setTimeout(() => {
            history('/my-store/menu/manage-products/');
        }, 500)
    }

    const onSaveChanges = async () => {
        if(!name){
            toast.error(t("messages.required.name"));
            return;
        }
        if(!description){
            toast.error(t("messages.required.description"));
            return;
        }
        if(!status){
            toast.error(t("messages.required.status"));
            return;
        }
        if(!priceInCent){
            toast.error(t("messages.required.priceInCent"));
            return;
        }
        if(!promoPriceInCent){
            toast.error(t("messages.required.promoPriceInCent"));
            return;
        }
        if(!size){
            toast.error(t("messages.required.size"));
            return;
        }
        if(!subCategory){
            toast.error(t("messages.required.subCategory"));
            return;
        }
        if(!rankByStore){
            toast.error(t("messages.required.rankByStore"));
            return;
        }
        if(!quantity){
            toast.error(t("messages.required.quantity"));
            return;
        }
        let payloads = {
            name: name,
            description: description,
            status: status,
            priceInCent: priceInCent,
            promoPriceInCent: promoPriceInCent,
            isPromoApplied: isPromoApplied,
            size: size,
            subCategory: subCategory,
            brand: brand,
            rankByStore: rankByStore,
            quantity: quantity,
        }
        await setProductDetailsByIdAPI(productId, payloads).then(res=>{
            toast.success(t("messages.success"));
            onClosing();
        }).catch(err => toast.error(err.message))
    }

    return (
        <div className={'MyStoreEditProduct global-popup ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
            <div className={'global-popup-inner ' + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                <p className='PhotoGalleryEditPopup-close-button' onClick={onClosing} >X</p>
                <div className='PhotoGalleryEditPopup-top-div'>
                    <h4>{t("labels.id")} {data.sp_id}</h4>
                    <h4>{t("labels.createdAt")} {moment(data.createdAt).format("MM-DD-YYYY")}</h4>
                </div>

                <hr />

                <div className='MyStoreEditProduct-input-div'>
                    <label className='MyStoreEditProduct-input-label' htmlFor='MyStoreEditProduct-store-name-input'>
                        {t("labels.name")}
                    </label> <br />
                    <input
                        id='MyStoreEditProduct-store-name-input'
                        value={name}
                        onChange={e => {
                            if (e.target.value.length < 500) {
                                setName(e.target.value);
                                setNameError('');
                            } else {
                                setNameError(t("messages.maxCharsName"));
                            }
                        }}
                    />
                    {!!nameError && <p className='StoreSettings-unique-id-message text-danger'>{nameError}</p>}
                </div>

                <div className='MyStoreEditProduct-input-div'>
                    <label className='MyStoreEditProduct-input-label' htmlFor='MyStoreEditProduct-store-desc-input'>
                        {t("labels.description")}
                    </label> <br />
                    <textarea
                        id='MyStoreEditProduct-store-desc-input'
                        rows='5'
                        value={description}
                        onChange={e => { e.target.value.length < 800 ? setDescription(e.target.value) : setDescError(true) }}
                    ></textarea>
                    {descError && <p className='MyStoreEditProduct-unique-id-message text-danger'>{t("messages.maxCharsDesc")}</p>}
                </div>

                <div className='MyStoreEditProduct-input-div MyStoreEditProduct-inline-inputs2'>
                    <label className='MyStoreEditProduct-input-label'>
                        {t("labels.status")}
                    </label>
                    <select
                        className='MyStoreEditProduct-type-input'
                        name='status'
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="">{t("selectOption")}</option>
                        {statusOptions.map(so => <option key={so.id} value={so.id}>{so[language]}</option>)}
                    </select>
                </div>

                <hr />

                <div className='MyStoreEditProduct-inline-inputs'>
                    <div className='MyStoreEditProduct-inline-inputs1'>
                        <label className='MyStoreEditProduct-input-label'>
                            {t("labels.price")}
                        </label><br />
                        <input
                            className='MyStoreEditProduct-number-input'
                            name='priceInCent'
                            value={priceInCent}
                            type="number"
                            placeholder={t("placeholders.price")}
                            onChange={e => setPriceInCent(e.target.value)}
                        />
                    </div>
                    <div className='MyStoreEditProduct-inline-inputs2'>
                        <label className='MyStoreEditProduct-input-label'>
                            {t("labels.promoPrice")}
                        </label><br />
                        <input
                            className='MyStoreEditProduct-number-input'
                            name='promoPriceInCent'
                            value={promoPriceInCent}
                            type="number"
                            placeholder={t("placeholders.price")}
                            onChange={e => setPromoPriceInCent(e.target.value)}
                        />
                    </div>
                </div>
                <p className='MyStoreEditProduct-note'>{t("notes.price")}</p>

                <div className='MyStoreEditProduct-input-div MyStoreEditProduct-inline-inputs'>
                    <input
                        className='MyStoreEditProduct-number-input'
                        name='isPromoApplied'
                        checked={isPromoApplied}
                        type="checkbox"
                        id="MyStoreEditProduct-idPromotionalPriceApplied"
                        onChange={e => setIsPromoApplied(e.target.checked)}
                    />
                    <label className='MyStoreEditProduct-input-label' htmlFor='MyStoreEditProduct-idPromotionalPriceApplied'>
                        {t("labels.applyPromo")}
                    </label>
                </div>

                <hr />

                <div className='MyStoreEditProduct-inline-inputs'>
                    <div className='MyStoreEditProduct-inline-inputs1'>
                        <label className='MyStoreEditProduct-input-label'>
                            {t("labels.size")}
                        </label><br />
                        <input
                            className='MyStoreEditProduct-number-input'
                            name='size'
                            value={size}
                            placeholder={t("placeholders.size")}
                            onChange={e => setSize(e.target.value)}
                        />
                    </div>
                    <div className='MyStoreEditProduct-inline-inputs2'>
                        <label className='MyStoreEditProduct-input-label'>
                            {t("labels.brand")}
                        </label><br />
                        <input
                            className='MyStoreEditProduct-number-input'
                            name='brand'
                            value={brand}
                            placeholder={t("placeholders.brand")}
                            onChange={e => setBrand(e.target.value)}
                        />
                    </div>
                </div>
                <p className='MyStoreEditProduct-note'>{t("notes.sizeAndBrand")}</p>

                <div className='MyStoreEditProduct-inline-inputs'>
                    <label className='MyStoreEditProduct-input-label'>
                        {t("labels.category")}
                    </label><br />
                    <input
                        className='MyStoreEditProduct-number-input MyStoreEditProduct-subCategory-inputs'
                        name='subCategory'
                        value={subCategory}
                        placeholder={t("placeholders.category")}
                        onChange={e => setSubCategory(e.target.value)}
                    />
                </div>

                <hr />

                <div className='MyStoreEditProduct-inline-inputs'>
                    <div className='MyStoreEditProduct-inline-inputs1'>
                        <label className='MyStoreEditProduct-input-label'>
                            {t("labels.rank")}
                        </label><br />
                        <input
                            className='MyStoreEditProduct-number-input'
                            name='rankByStore'
                            value={rankByStore}
                            type="number"
                            placeholder={t("placeholders.rankByStore")}
                            onChange={e => setRankByStore(e.target.value)}
                        />
                    </div>
                    <div className='MyStoreEditProduct-inline-inputs2'>
                        <label className='MyStoreEditProduct-input-label'>
                            {t("labels.quantity")}
                        </label><br />
                        <input
                            className='MyStoreEditProduct-number-input'
                            name='quantity'
                            value={quantity}
                            type="number"
                            placeholder={t("placeholders.quantity")}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>
                </div>

                <p className='MyStoreEditProduct-note'>{t("notes.rank")}</p>

                <hr />

                <p className='store-submit-button1' onClick={onSaveChanges}>{t("submitButton")}</p>

            </div>
        </div>
    )
}

export default MyStoreEditProduct