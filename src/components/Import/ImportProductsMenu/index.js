import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './style.css';

function ImportProductsMenu() {
  const [t, ] = useTranslation('importProductsMenu');
  return (
    <div className='ImportProductsMenu'>
        <Link to="/my-store/import-products/viaCSV">
            <img src='/assets/icons/svgs/googleSheetIcon.svg' alt='googleSheetIcon' />
            <h4>{t("csvText")}</h4>
        </Link>
        <Link to="/my-store/import-products/viaTicTag">
            <img src='/assets/icons/svgs/tictagIntegration.svg' alt='tictagIntegration' />
            <h4>{t("tictagText")}</h4>
        </Link>
        <Link to="/my-store/import-products/addManually">
            <img src='/assets/icons/svgs/plushBlack.svg' alt='plushBlack' />
            <h4>{t("manualText")}</h4>
        </Link>
    </div>
  )
}

export default ImportProductsMenu