import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function ProductCardForStore({
    product,
    onCameraClick
}) {
  return (
    <div className='ProductCardForStore'>
        <div className='ProductCardForStore-info'>
            ID: {product.sp_id}
            <div className='ProductCardForStore-btn-icons'>
                <Link to={`/my-store/menu/manage-products/${product.id}`}>
                    <img className='ProductCardForStore-btn-icons-img' src='/assets/icons/pngs/editWhite.png' alt='edit'/>
                </Link>
                <img className='ProductCardForStore-btn-icons-img' onClick={()=>onCameraClick(product.id)} src='/assets/icons/pngs/cameraWhite.png' alt='capture' />
            </div>
        </div>
        <hr/>
        <div>
            {product.name}
        </div>
    </div>
  )
}

export default ProductCardForStore