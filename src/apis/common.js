import axios from "axios";
// import moment from "moment";

// const baseUrl = 'http://127.0.0.1:8000/v1/';
const baseUrl = 'https://apis.getcustomer.live/v1/';


export async function testAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function sendOtpOnMailApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/sendOtpOnMail/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function resetPasswordApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/resetPassword/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function signOutdApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/signOut/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function sendSignupOtpOnMailApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/sendSignupOtpOnMail/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function signupApi(payloads, storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_data/${storeId}/signup/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function loginApi(payloads, storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_data/${storeId}/login/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function checkAndSetUserAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}customer_data/${localStorage.getItem("storeId")}/checkAuth/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getNumberOfExploredStoresAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getNumberOfExploredStores/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getFavStoresByUserAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getFavStoresByUser?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getAllStoresByUserAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getAllStoresByUser?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function checkStoreIdentifierAPI(identifier) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/checkStoreIdentifier?identifier=${identifier}`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function createStoreApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/createStore/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getDelieveryCostByZipCodeAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/getDelieveryCostByZipCode/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getDelieveryCostByZipCodeForOrdersAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/getDelieveryCostByZipCodeForOrders/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getStoreSettingsAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getStoreSettings/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function updateStoreSettingsApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/updateStoreSettings/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function updateUserAccountSettingsApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/updateUserAccountSettings/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getCanAddMoreProductsAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getCanAddMoreProducts/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function addProductsByCsvDataApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/addProductsByCsvData/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function submitFeedbackApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/submitFeedback/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getStoreFilterOptionsApi(storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getStoreFilterOptions/${storeId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function getMyStoreProductsAPI(page=1, payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/getMyStoreProducts?page=${page}&recordsPerPage=10`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getImagesByProductIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getImagesByProductId/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function addImageByProductIdAPI(id, payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/addImageByProductId/${id}/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function replaceImageByProductIdAndImageIdAPI(productId, imageId, payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/replaceImageByProductIdAndImageId/${productId}/${imageId}/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function deleteImageByProductIdAndImageIdAPI(productId, imageId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.delete(
            `${baseUrl}account/deleteImageByProductIdAndImageId/${productId}/${imageId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getProductDetailsToEditByIdAPI(productId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getProductDetailsToEditById/${productId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getProductStatusOptionsAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getProductStatusOptions/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function setProductDetailsByIdAPI(productId, payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/setProductDetailsById/${productId}/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function adddNewProductAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/adddNewProduct/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getStoreDetailsByIdAPI(storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getStoreDetailsById/${storeId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getProductDetailsByIdAPI(productId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getProductDetailsById/${productId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getProductsForStoreViewByIdAPI(storeId, page, viewType) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getProductsForStoreViewById/${storeId}?page=${page}&recordsPerPage=20&viewType=${viewType}`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getUserLikedProductsAPI( page ) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUserLikedProducts?page=${page}&recordsPerPage=20`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function likeProductByIdAPI(productId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/likeProductById/${productId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function addToBagProductByIdAPI(productId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/addToBagProductById/${productId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function removeProductFromBagProductByIdAPI(productId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/removeProductFromBagProductById/${productId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function addressAndPayScreenCheckAPI(productId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/addressAndPayScreenCheck/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function removeStoreFronFavByIdAPI(storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/removeStoreFronFavById/${storeId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                if(res.data.status === "success") onResolve(res);
                else{
                    const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
                    let err = {...res.data, message: res.data.error[language]};
                    onReject(err);
                }
            })
            .catch(err => onReject(err));
    });
}

export async function getUserNotificationsAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUserNotifications?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getStoreNotificationsAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getStoreNotifications?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getUsersPreviousOrdersAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUsersPreviousOrders?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getStoresPreviousOrdersAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getStoresPreviousOrders?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function markNotificationsAsReadAPI(notificationId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/markNotificationsAsRead/${notificationId}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function getProductsInUsersBagAPI({page=1}) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getProductsInUsersBag?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function setQuantityByProductsInUsersBagIdAPI(id, quantity) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/setQuantityByProductsInUsersBagId/${id}/`,
            {"quantity": quantity},
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function userBagCheckoutAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/userBagCheckout/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function saveAddressAndContinueOrderAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/saveAddressAndContinueOrder/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function cancelTheOrderAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/cancelTheOrder/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function editTheOrderAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/editTheOrder/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function saveTicTagInfoAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/saveTicTagInfo/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function getUserAccountDetailsAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUserAccountDetails/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getUserGeneralSettingsAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUserGeneralSettings/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function settUserGeneralSettingsAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/setUserGeneralSettings/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getUserOrderDetailsByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUserOrderDetailsById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function setUserOrderDeliveredByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/setUserOrderDeliveredById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function cancelTheOrderFromStoreByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/cancelTheOrderFromStoreById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getDashboardDataAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getDashboardData/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getUserProfileIdAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getUserProfileId/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}
