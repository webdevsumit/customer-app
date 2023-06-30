import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { removeStoreFronFavByIdAPI } from '../../apis/common';
import "./style.css";

function ExploreStoreCard({
    store,
    hasFavRemoveBtn=false,
    removeFromParentList,
}) {

    const [t,] = useTranslation('common');
    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
    const [remainingImagesm, setRemainingImages] = useState([]);
    useEffect(()=>{
        let tempLst = [];
        for(let i=0; i<6-store.six_poducts_images.length; i++){
            tempLst.push(i);
        }
        setRemainingImages(tempLst);
        // eslint-disable-next-line
    },[])

    const removeFromTheList = async () => {
        await removeStoreFronFavByIdAPI(store.id).then(res=>{
            toast.success(res.data.message[language]);
            removeFromParentList(store.id);
        }).catch(err=>toast.error(err.message));
    }

    return (
        <div className='ExploreStoreCard'>
            <h4 className='ExploreStoreCard-storeName' >{store.store_name}</h4>
            <Link to={`/${store.unique_id}`} className='ExploreStoreCard-inner-link'>
                <div className='ExploreStoreCard-inner'>
                    
                    {remainingImagesm
                        .map((index) => <img
                            className='ExploreStoreCard-image'
                            key={index}
                            src="/assets/pngs/noPhoto.png"
                            alt="Product"
                        />
                    )}
                    {store.six_poducts_images.reverse()
                        .map((img, index) => <img
                            className='ExploreStoreCard-image'
                            key={index}
                            src={img}
                            alt="Product"
                        />
                    )}
                </div>
            </Link>
            {hasFavRemoveBtn && <p onClick={removeFromTheList} className='ExploreStoreCard-global-popup-close-btn' title=''>
                {t("removeFromTheListLabel")}
                {/* <span className='ExploreStoreCard-global-popup-close-btn-hover' >Remove from the list</span> */}
                {/* <span className='ExploreStoreCard-global-popup-close-btn-no-hover' >X</span> */}
            </p>}
        </div>
    )
}

export default ExploreStoreCard