import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

function ProductFilter({
    onClose = '',
    categoryOptions = [],
    sortByOptions = [],
    initSortBy='',
    onSubmit='',
    prevFilterValues
}) {

    const [t, ] = useTranslation('productFilter');

    const [isClosing, setIsClosing] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [withoutImages, setWithoutImages] = useState(false);
    const [category, setCategory] = useState('all');
    const [sortBy, setSoryBy] = useState(initSortBy);
    const [sortByTypeAsc, setSortByTypeAsc] = useState(false)

    const onClosing = () => {
        setIsClosing(true);
        setTimeout(()=>{
            onClose();
        },500)
    }

    const onFilterClick = () => {
        setIsClosing(true);
        setTimeout(()=>{
            onSubmit({
                startDate: moment(startDate, "YYYY-MM-DD"),
                endDate: moment(endDate, "YYYY-MM-DD"),
                withoutImages,
                category,
                sortBy,
                sortByTypeAsc
            });
        },500)
    }

    useEffect(()=>{
        if(!!prevFilterValues){
            setStartDate(moment(prevFilterValues.startDate, "YYYY-MM-DD").format("YYYY-MM-DD"));
            setEndDate(moment(prevFilterValues.endDate, "YYYY-MM-DD").format("YYYY-MM-DD"));
            setWithoutImages(prevFilterValues.withoutImages);
            setCategory(prevFilterValues.category);
            setSoryBy(prevFilterValues.sortBy);
            setSortByTypeAsc(prevFilterValues.sortByTypeAsc);
        }
        // eslint-disable-next-line
    },[])

    return (
        <div className={'ProductFilter '+(isClosing?"ProductFilter-closing-opacitor-animation":"ProductFilter-opening-opacitor-animation")}>
            <div className={'ProductFilter-inner '+(isClosing?"ProductFilter-closing-animation":"ProductFilter-opening-animation")}>
                <p className='ProductFilter-inner-close-btn' onClick={onClosing} >X</p>
                <h3 className='ProductFilter-main-heads'>{t("labels.filter")}</h3>
                <div className='ProductFilter-input-divs'>
                    <label htmlFor='ProductFilter-startDate'>{t("labels.startDate")}</label>
                    <input id='ProductFilter-startDate' type='date' value={startDate} onChange={e=>setStartDate(e.target.value)} />
                </div>
                <div className='ProductFilter-input-divs'>
                    <label htmlFor='ProductFilter-endDate'>{t("labels.endDate")}</label>
                    <input id='ProductFilter-endDate' type='date' value={endDate} onChange={e=>setEndDate(e.target.value)} />
                </div>
                <div className='ProductFilter-input-divs'>
                    <label htmlFor='ProductFilter-categoryOptions'>{t("labels.category")} </label>
                    <select id='ProductFilter-categoryOptions' value={category} onChange={e=>setCategory(e.target.value)}>
                        <option value="all">{t("labels.all")}</option>
                        {categoryOptions.map((cat, i)=><option key={i} value={cat.value}>{cat.label}</option>)}
                    </select>
                </div>
                <div className='ProductFilter-input-divs'>
                    <label htmlFor='ProductFilter-without-image'>{t("labels.withoutImage")} </label>
                    <input id='ProductFilter-without-image' type='checkbox' checked={withoutImages} onChange={e=>setWithoutImages(e.target.checked)} />
                </div>
                
                <label htmlFor='ProductFilter-sortByOptions'><h3 className='ProductFilter-main-heads'>{t("labels.sortBy")}</h3></label>
                <div className='ProductFilter-input-divs'>
                    <select id='ProductFilter-sortByOptions' value={sortBy} onChange={e=>setSoryBy(e.target.value)}>
                        {sortByOptions.map((sb, i)=><option key={i} value={sb.value}>{sb.label[language]}</option>)}
                    </select>
                </div>
                <h3 className='ProductFilter-main-heads'>{t("labels.sortByType")}</h3>
                <div className='ProductFilter-input-divs'>
                    <input id='ProductFilter-sortBy-type-asc' type='checkbox' checked={sortByTypeAsc} onChange={e=>setSortByTypeAsc(e.target.checked)} />
                    <label htmlFor='ProductFilter-sortBy-type-asc'>{t("labels.asce")} </label>
                    <input id='ProductFilter-sortBy-type-desc' type='checkbox' checked={!sortByTypeAsc} onChange={e=>setSortByTypeAsc(!e.target.checked)} />
                    <label htmlFor='ProductFilter-sortBy-type-desc'>{t("labels.desc")} </label>
                </div>
                <p className='ProductFilter-button1' onClick={onFilterClick}>
                    {t("submitButton")}
                </p>
            </div>
        </div>
    )
}

export default ProductFilter