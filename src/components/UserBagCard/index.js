import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { currencyConverter } from '../../actions/commons';
import './style.css';

let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if(!currentStoreCurrency) currentStoreCurrency = 'R$';

function UserBagCard({
    product,
    changeQuantity,
    removeProductFromList,
    removeProductFromList_onTicTag,
    isFromTicTag=false,
}) {
    const [t,] = useTranslation('userBag');
    
    const [productDetails, setProductDetails] = useState(product);
    const [quantityToChange, setQuantityToChage] = useState(product.quantity);
    const [editQuantityPopUp, setEditQuantityPopup] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const onClosingQuantityChange = () => {
        setIsClosing(true);
        setTimeout(() => {
            setEditQuantityPopup(false);
        }, 500)
    }
    
    const onChangeQuantity = async (e) => {
        changeQuantity(product.id, quantityToChange);
        setProductDetails({...product, quantity: quantityToChange})
        onClosingQuantityChange();
    }
    
    let price = productDetails.product.is_promotional_price_applied ? productDetails.product.promotional_price_in_cent : productDetails.product.price_in_cent;
    return (
        <div className='UserBagCard'>
            <p className='global-popup-close-btn UserBagCard-remove-btn ' onClick={()=>{
                if(isFromTicTag) removeProductFromList_onTicTag(product.id);
                else removeProductFromList(product.id)
            }}>
                <span>-</span>
            </p>
            {editQuantityPopUp && <div className={'UserBagCard-popup ' + (isClosing ? "global-closing-opacitor-animation" : "global-opening-opacitor-animation")}>
                <div className={'UserBagCard-popup-inner ' + (isClosing ? "global-closing-animation" : "global-opening-animation")}>
                    <p className='global-popup-close-btn UserBagCard-popup-close-btn ' onClick={onClosingQuantityChange}>X</p>
                    <input type="range" value={quantityToChange} onChange={e=>setQuantityToChage(e.target.value)} min="1" max={`${productDetails.product.quantity}`} />
                    <div className='UserBagCard-popup-second-container'>
                        <p>{t("card.quantity")} {quantityToChange}</p>
                        <p>{t("card.availableQuantity")} {product.product.quantity}</p>
                        <p className='UserBagCard-popup-inner-submit-button1' onClick={onChangeQuantity}>CHANGE</p>
                    </div>
                </div>
            </div>}
            <img className='UserBagCard-img' src={!!productDetails.product.image ? productDetails.product.image : "/assets/pngs/noPhoto.png"} alt="product" />
            <div className='UserBagCard-desc'>
                <p>{productDetails.product.name}</p>
            </div>
            <div className='UserBagCard-details-price-div'>
                <h5 className='UserBagCard-details-price'>{currentStoreCurrency}: {currencyConverter(price / 100, currentStoreCurrency)}</h5>
                <h5 className='UserBagCard-details-price'>X{productDetails.quantity}
                    {!isFromTicTag &&
                        <img onClick={()=>{setEditQuantityPopup(true); setIsClosing(false)}} className='UserBagCard-details-quantity-edit-icon' src='/assets/icons/pngs/editWhite.png' alt='edit'/>
                    }
                </h5>
                <h5 className='UserBagCard-details-price'>{currentStoreCurrency}: {currencyConverter((price*productDetails.quantity) / 100, currentStoreCurrency)}</h5>
            </div>
        </div>
    )
}

export default UserBagCard