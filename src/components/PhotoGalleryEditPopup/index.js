import React, { useEffect, useState } from 'react';
import './style.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { addImageByProductIdAPI, deleteImageByProductIdAndImageIdAPI, getImagesByProductIdAPI, replaceImageByProductIdAndImageIdAPI } from '../../apis/common';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

function PhotoGalleryEditPopup({
    productId,
    onClosePopup,
}) {

    const [t, ] = useTranslation('photoGalleryEditPopup');

    const [isClosing, setIsClosing] = useState(false);
    const [images, setImages] = useState([]);
    const [showImages, setShowImages] = useState(false);

    // Defining image width and height...
    var windowInnerWidth = window.innerWidth;
    var windowInnerHeight = window.innerHeight;
    var imageSize = windowInnerWidth<windowInnerHeight ? windowInnerWidth : windowInnerHeight-300;

    const getImages = async () => {
        await getImagesByProductIdAPI(productId).then(res=>{
            if(res.data.status==="success"){
                setImages(res.data.images);
                setTimeout(()=>{
                    setShowImages(true);
                },0)
            }else{
                toast.error(res.data.error[language])
            }
        }).catch(err=>toast.error(err.message))
    }

    useEffect(()=>{
        getImages();
        return(()=>{
            setImages([]);
        })
        // eslint-disable-next-line
    },[]);

    const onClosing = () => {
        setIsClosing(true);
        setTimeout(()=>{
            onClosePopup();
        },500)
    }

    const onChangeImage = async (e) => {
        let image = e.target.files[0];
        if(!image){
            toast.error(t("messages.image"));
			return;
        }
        if (image.size / 1024 > 500) {
			toast.error(t("messages.size"));
			return;
		}

        let formdata = new FormData();
        formdata.append("image", image);

        // let message = ".........";
        toast.promise(
            addImageByProductIdAPI(productId, formdata).then(res=>{
                setImages(prevData=>[...prevData, res.data.image]);
                toast.success(t("messages.success"))
            }).catch(err=>toast.error(err.message)),
            {
                loading: t("messages.saving"),
                // error: <b>{message}</b>,
                // success: <b>Settings saved!</b>,
            }
        );
    } 

    const onReplaceImage = async (e, imageId) => {
        let image = e.target.files[0];
        if(!image){
            toast.error(t("messages.success"));
			return;
        }
        if (image.size / 1024 > 500) {
			toast.error(t("messages.size"));
			return;
		}

        let formdata = new FormData();
        formdata.append("image", image);

        // let message = ".........";
        toast.promise(
            replaceImageByProductIdAndImageIdAPI(productId, imageId, formdata).then(res=>{
                setImages(prevData=>prevData.map(tImage=>{
                    if(tImage.id === imageId) return  {id: tImage.id, image:res.data.image.image};
                    return tImage;
                }));
                toast.success(t("messages.success"))
            }).catch(err=>toast.error(err.message)),
            {
                loading: t("messages.saving"),
                // error: <b>{message}</b>,
                // success: <b>Settings saved!</b>,
            }
        );
    }

    const deleteImage = async (imageId) => {
        toast.promise(
            deleteImageByProductIdAndImageIdAPI(productId, imageId).then(res=>{
                setImages(prevData=>prevData.filter(tImage=>tImage.id !== imageId));
                toast.success(t("messages.deleted"));
            }).catch(err=>toast.error(err.message)),
            {
                loading: t("messages.deleting"),
                // error: <b>{message}</b>,
                // success: <b>Settings saved!</b>,
            }
        );
    }

    return (
        <div className={'PhotoGalleryEditPopup '+(isClosing?"global-closing-opacitor-animation":"global-opening-opacitor-animation")}>
            <div className={'PhotoGalleryEditPopup-inner '+(isClosing?"global-closing-animation":"global-opening-animation")} style={{width: `${imageSize}px`, height: `${imageSize+50}px`}} >
                <p className='PhotoGalleryEditPopup-close-button' onClick={onClosing} >X</p>
                <p className='PhotoGalleryEditPopup-top-header'>{t("labels.top")}</p>
                {(!showImages || images.length===0)? <>
                    {(showImages && images.length===0)?<>
                        <div>
                            <div className='PhotoGalleryEditPopup-divStyle' style={{ width: `${imageSize}px`, height: `${imageSize}px`, 'backgroundImage': `url("/assets/pngs/add.jpeg")` }}>
                                <label className='PhotoGalleryEditPopup-spanStyle' htmlFor='PhotoGalleryEditPopup-new-image-input-new-one'>{t("labels.addNew")}</label>
                                <input type="file" id="PhotoGalleryEditPopup-new-image-input-new-one" className="PhotoGalleryEditPopup-new-image-input"  accept="image/png, image/jpeg" onChange={onChangeImage} />
                            </div>
                        </div>
                    </>:<>
                        <div>
                            <div className='PhotoGalleryEditPopup-divStyle' style={{ width: `${imageSize}px`, height: `${imageSize}px`, 'backgroundImage': `url("/assets/icons/pngs/editWhite.png")` }}>
                                <span className='PhotoGalleryEditPopup-spanStyle'>{t("messages.loading")}</span>
                            </div>
                        </div>
                    </>}
                </>:<>
                    <Slide 
                        transitionDuration="400" 
                        autoplay={false} 
                        // defaultIndex={images.length-1} 
                    >
                        {images.map((slideImage, index) => (
                            <div key={index}>
                                <div className='PhotoGalleryEditPopup-divStyle' style={{ width: `${imageSize-4}px`, height: `${imageSize}px`, 'backgroundImage': `url(${slideImage.image})` }}>
                                    <p className='PhotoGalleryEditPopup-divStyle-numImage-indicator'>{index+1}/{images.length}</p>
                                    <span className='PhotoGalleryEditPopup-spanStyle' onClick={()=>deleteImage(slideImage.id)}>{t("buttons.delete")}</span>
                                    <label className='PhotoGalleryEditPopup-spanStyle' htmlFor={`PhotoGalleryEditPopup-new-image-change-input-${index}`}>{t("buttons.replace")}</label>
                                    <input type="file" id={`PhotoGalleryEditPopup-new-image-change-input-${index}`} className="PhotoGalleryEditPopup-new-image-input" accept="image/png, image/jpeg" onChange={(e)=>onReplaceImage(e, slideImage.id)} />
                                    <label className='PhotoGalleryEditPopup-spanStyle' htmlFor={`PhotoGalleryEditPopup-new-image-input-${index}`}>{t("buttons.add-New")}</label>
                                    <input type="file" id={`PhotoGalleryEditPopup-new-image-input-${index}`} className="PhotoGalleryEditPopup-new-image-input" accept="image/png, image/jpeg" onChange={onChangeImage} />
                                </div>
                            </div>
                        ))}
                    </Slide>
                </>}
                
            </div>
        </div>
    )
}

export default PhotoGalleryEditPopup