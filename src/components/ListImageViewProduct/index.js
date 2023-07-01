import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';
import { currencyConverter } from '../../actions/commons';
import 'react-slideshow-image/dist/styles.css';
import { addToBagProductByIdAPI, likeProductByIdAPI } from '../../apis/common';
import './style.css';

function ListImageViewProduct({
    cardMargin = '10px',
    hasCardInCard = false,
    product,
}) {

    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
    const [t, ] = useTranslation('common');
    const [productObj, setProductObj] = useState(product);
    const [openDescription, setOpenDescription] = useState(false);
    const [images,] = useState((!!product && !!product.images && product.images.length > 0) ? product.images : [{id:1, image: "/assets/pngs/noPhoto.png"}]);
    // Defining image width and height...
    var windowInnerWidth = window.innerWidth-55;
    var windowInnerHeight = window.innerHeight;
    var imageSize = windowInnerWidth < windowInnerHeight ? windowInnerWidth : windowInnerHeight - 300;
    let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
    if(!currentStoreCurrency) currentStoreCurrency = 'Rs';
    let currentStoreDateFormat = localStorage.getItem('currentStoreDateFormat');
    if(!!currentStoreDateFormat) currentStoreDateFormat =  'DD/MM/YYYY';
    let showBrandOnApp = localStorage.getItem('showBrandOnApp') === "show";
    let showSizeOnApp = localStorage.getItem('showSizeOnApp') === "show";

    const likeUnlike =  async () => {
        setProductObj({...productObj, likedByUser: !productObj.likedByUser })
        await likeProductByIdAPI(productObj.id).then(res=>{
            if(res.data.status === "success"){
                setProductObj({...productObj, likedByUser: res.data.liked })
            }
        }).catch(err=>toast.error(err.message));
    } 

    const addAndRemoveFromBag =  async () => {
        setProductObj({...productObj, addedToBagByUser: !productObj.addedToBagByUser })
        await addToBagProductByIdAPI(productObj.id).then(res=>{
            if(res.data.status === "success"){
                setProductObj({...productObj, addedToBagByUser: res.data.added });
                toast.success(res.data.message[language]);
            }
        }).catch(err=>toast.error(err.message));
        
    } 

    const [isClosing, setIsClosing] = useState(false);
    const onClosingDesc = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpenDescription(false);
            setIsClosing(false);
        }, 500)
    }

    return (
        <div className='ListImageViewProduct' style={{margin: cardMargin}}>
            {openDescription && <>
                <div className={''+ (hasCardInCard ? "ListImageViewProduct-desc-outer-cardInCard ": "ListImageViewProduct-desc-outer ") + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
                    <div className={'global-popup-inner '+ (hasCardInCard ? "ListImageViewProduct-desc-inner-cardInCard ": "ListImageViewProduct-desc-inner ") + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                        <p className='ListImageViewProduct-desc-inner-close-button' onClick={onClosingDesc} >X</p>
                        <h4>{t("descriptionLabel")}</h4>
                        <hr/>
                        <p>{product.description}</p>
                    </div>
                </div>
            </>}
            <p className='ListImageViewProduct-name'>{productObj.name}</p>
            <div style={{ maxWidth: `${imageSize}px`}} className='ListImageViewProduct-inner'>
                <Slide
                    transitionDuration="400"
                    autoplay={false}
                >
                    {images.map((slideImage, index) => (
                        <div key={index}>
                            <div className='ListImageViewProduct-divStyle' style={{ width: `${imageSize}px`, height: `${imageSize}px`, 'backgroundImage': `url(${slideImage.image})` }}>
                                <p className='ListImageViewProduct-divStyle-numImage-indicator'>{index + 1}/{images.length}</p>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>
            <div className='ListImageViewProduct-details' >
                <div>
                    <div className='ListImageViewProduct-details-size-brand-div'>
                        {showBrandOnApp && <p>{productObj.brand?.brand}</p>}
                        {showSizeOnApp && <p>{productObj.size?.size}</p>}
                    </div>
                    <div className='ListImageViewProduct-details-price-div'>
                        {productObj.is_promotional_price_applied?<>
                            <h5 className='ListImageViewProduct-details-price-overline'>{currentStoreCurrency}: {currencyConverter(productObj.price_in_paisa/100, currentStoreCurrency)}</h5>
                            <h5 className='ListImageViewProduct-details-price'>{currentStoreCurrency}: {currencyConverter(productObj.promo_price_in_paisa/100, currentStoreCurrency)}</h5>
                        </>:
                        <>
                            <h5 className='ListImageViewProduct-details-price'>{currentStoreCurrency}: {currencyConverter(productObj.price_in_paisa/100, currentStoreCurrency)}</h5>
                        </>}
                    </div>
                    <p className='ListImageViewProduct-details-know-more-btn' onClick={()=>setOpenDescription(true)}>{t("knowMoreLabel")}</p>
                </div>
                <div className='ListImageViewProduct-details-icons'>
                    {productObj.likedByUser ? 
                        <img onClick={likeUnlike} src='/assets/icons/svgs/heartRed.svg' alt='liked' />
                        :
                        <img onClick={likeUnlike} src='/assets/icons/svgs/favoriteBlackOutline.svg' alt='like this.' />
                    }
                    {productObj.addedToBagByUser? 
                        <img onClick={addAndRemoveFromBag} src='/assets/icons/svgs/bagFilled.svg' alt='saved.' />
                        :
                        <img onClick={addAndRemoveFromBag} src='/assets/icons/svgs/ShoppingBagBlackOutline.svg' alt='add to bag.' />
                    }
                </div>
            </div>
        </div>
    )
}

export default ListImageViewProduct