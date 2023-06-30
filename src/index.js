import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_en from "./translations/en/common.json";
import landing_en from "./translations/en/landing.json";
import signup_en from "./translations/en/signup.json";
import login_en from "./translations/en/login.json";
import forgotPassword_en from "./translations/en/forgotPassword.json";
import SLFContainer2_en from "./translations/en/SLFContainer2.json";
import userSidebar_en from "./translations/en/userSidebar.json";
import storeSidebar_en from "./translations/en/storeSidebar.json";
import storeSettings_en from "./translations/en/storeSettings.json";
import addressInputList_en from "./translations/en/addressInputList.json";
import phoneInputList_en from "./translations/en/phoneInputList.json";
import manageProducts_en from "./translations/en/manageProducts.json";
import productFilter_en from "./translations/en/productFilter.json";
import photoGalleryEditPopup_en from "./translations/en/photoGalleryEditPopup.json";
import myStoreEditProduct_en from "./translations/en/myStoreEditProduct.json";
import importProducts_en from "./translations/en/importProducts.json";
import importProductsMenu_en from "./translations/en/importProductsMenu.json";
import importProductsViaCsvFile_en from "./translations/en/importProductsViaCsvFile.json";
import userMenu_en from "./translations/en/userMenu.json";
import createStore_en from "./translations/en/createStore.json";
import storeMenu_en from "./translations/en/storeMenu.json";
import exploreStores_en from "./translations/en/exploreStores.json";
import userBag_en from "./translations/en/userBag.json";
import setAddressAndPay_en from "./translations/en/setAddressAndPay.json";
import tictagIntegration_en from "./translations/en/tictagIntegration.json";
import UserAccount_en from "./translations/en/UserAccount.json";
import globalSettings_en from "./translations/en/globalSettings.json";
import previousOrdersCard_en from "./translations/en/previousOrdersCard.json";
import orderDetails_en from "./translations/en/orderDetails.json";
import storeDashboard_en from "./translations/en/storeDashboard.json";
import ticTagStoreManagementMessage_en from "./translations/en/ticTagStoreManagementMessage.json";

import common_pt from "./translations/pt/common.json";
import landing_pt from "./translations/pt/landing.json";
import signup_pt from "./translations/pt/signup.json";
import login_pt from "./translations/pt/login.json";
import forgotPassword_pt from "./translations/pt/forgotPassword.json";
import SLFContainer2_pt from "./translations/pt/SLFContainer2.json";
import userSidebar_pt from "./translations/pt/userSidebar.json";
import storeSidebar_pt from "./translations/pt/storeSidebar.json";
import storeSettings_pt from "./translations/pt/storeSettings.json";
import addressInputList_pt from "./translations/pt/addressInputList.json";
import phoneInputList_pt from "./translations/pt/phoneInputList.json";
import manageProducts_pt from "./translations/pt/manageProducts.json";
import productFilter_pt from "./translations/pt/productFilter.json";
import photoGalleryEditPopup_pt from "./translations/pt/photoGalleryEditPopup.json";
import myStoreEditProduct_pt from "./translations/pt/myStoreEditProduct.json";
import importProducts_pt from "./translations/pt/importProducts.json";
import importProductsMenu_pt from "./translations/pt/importProductsMenu.json";
import importProductsViaCsvFile_pt from "./translations/pt/importProductsViaCsvFile.json";
import userMenu_pt from "./translations/pt/userMenu.json";
import createStore_pt from "./translations/pt/createStore.json";
import storeMenu_pt from "./translations/pt/storeMenu.json";
import exploreStores_pt from "./translations/pt/exploreStores.json";
import userBag_pt from "./translations/pt/userBag.json";
import setAddressAndPay_pt from "./translations/pt/setAddressAndPay.json";
import tictagIntegration_pt from "./translations/pt/tictagIntegration.json";
import UserAccount_pt from "./translations/pt/UserAccount.json";
import globalSettings_pt from "./translations/pt/globalSettings.json";
import previousOrdersCard_pt from "./translations/pt/previousOrdersCard.json";
import orderDetails_pt from "./translations/pt/orderDetails.json";
import storeDashboard_pt from "./translations/pt/storeDashboard.json";
import ticTagStoreManagementMessage_pt from "./translations/pt/ticTagStoreManagementMessage.json";

i18next.init({
	interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en,              // 'common' is our custom namespace
            landing: landing_en,
            signup: signup_en,
            login: login_en,
            forgotPassword: forgotPassword_en,
            SLFContainer2: SLFContainer2_en,
            userSidebar: userSidebar_en,
            storeSidebar: storeSidebar_en,
            storeSettings: storeSettings_en,
            addressInputList: addressInputList_en,
            phoneInputList: phoneInputList_en,
            manageProducts: manageProducts_en,
            productFilter: productFilter_en,
            photoGalleryEditPopup: photoGalleryEditPopup_en,
            myStoreEditProduct: myStoreEditProduct_en,
            importProducts: importProducts_en,
            importProductsMenu: importProductsMenu_en,
            importProductsViaCsvFile: importProductsViaCsvFile_en,
            userMenu: userMenu_en,
            createStore: createStore_en,
            storeMenu: storeMenu_en,
            exploreStores: exploreStores_en,
            userBag: userBag_en,
            setAddressAndPay: setAddressAndPay_en,
            tictagIntegration: tictagIntegration_en,
            UserAccount: UserAccount_en,
            globalSettings: globalSettings_en,
            previousOrdersCard: previousOrdersCard_en,
            orderDetails: orderDetails_en,
            storeDashboard: storeDashboard_en,
            ticTagStoreManagementMessage: ticTagStoreManagementMessage_en,
        },
        pt: {
            common: common_pt,
            landing: landing_pt,
            signup: signup_pt,
            login: login_pt,
            forgotPassword: forgotPassword_pt,
            SLFContainer2: SLFContainer2_pt,
            userSidebar: userSidebar_pt,
            storeSidebar: storeSidebar_pt,
            storeSettings: storeSettings_pt,
            addressInputList: addressInputList_pt,
            phoneInputList: phoneInputList_pt,
            manageProducts: manageProducts_pt,
            productFilter: productFilter_pt,
            photoGalleryEditPopup: photoGalleryEditPopup_pt,
            myStoreEditProduct: myStoreEditProduct_pt,
            importProducts: importProducts_pt,
            importProductsMenu: importProductsMenu_pt,
            importProductsViaCsvFile: importProductsViaCsvFile_pt,
            userMenu: userMenu_pt,
            createStore: createStore_pt,
            storeMenu: storeMenu_pt,
            exploreStores: exploreStores_pt,
            userBag: userBag_pt,
            setAddressAndPay: setAddressAndPay_pt,
            tictagIntegration: tictagIntegration_pt,
            UserAccount: UserAccount_pt,
            globalSettings: globalSettings_pt,
            previousOrdersCard: previousOrdersCard_pt,
            orderDetails: orderDetails_pt,
            storeDashboard: storeDashboard_pt,
            ticTagStoreManagementMessage: ticTagStoreManagementMessage_pt,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<I18nextProvider i18n={i18next}>
				<App />
			</I18nextProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
