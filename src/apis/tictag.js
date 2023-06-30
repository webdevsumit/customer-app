import axios from "axios";
// import moment from "moment";

// export const tictagUrl = 'http://127.0.0.1:8000';
export const tictagUrl = 'https://brechomulti.com.br';
// export const tictagUrl = 'https://tictag.com.br';

const tictagBaseUrl = `${tictagUrl}/v1/`;

export async function getProductDetailsFromTictagByIdAPI(productId, infoId, profileIdOnGolive) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/getProductDetailsFromTictagById/${productId}/`,
            {infoId, profileIdOnGolive},
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

export async function getProductsForTictagStoreViewByIdAPI(storeId, page, viewType, infoId, profileIdOnGolive) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/getProductsForTictagStoreViewById/`,
            {
                infoId,
                page,
                recordsPerPage: 20,
                viewType,
                storeId,
                profileIdOnGolive
            },
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

export async function sendOtpToIntegrateAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/sendOtpToIntegrate/`,
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

export async function confirmIntegrationOfTictagAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/confirmIntegrationOfTictag/`,
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

export async function confirmIntegrationOfTictagWithStoreSelectionAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/confirmIntegrationOfTictagWithStoreSelection/`,
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


export async function likeProductOnTicTagByIdAPI(productId, infoId, profileIdOnGolive) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/likeProductById/${productId}/`,
            {infoId, profileIdOnGolive },
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


export async function addToBagProductOnTicTagByIdAPI(productId, infoId, profileIdOnGolive) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/addToBagProductById/${productId}/`,
            {infoId, profileIdOnGolive },
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


export async function getProductsInUsersBagAPI_onTicTag(profileIdOnGolive, page=1) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${tictagBaseUrl}golive/getProductsInUsersBag?page=${page}&profileIdOnGolive=${profileIdOnGolive}&recordsPerPage=10`,
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


export async function removeProductFromBagProductByIdAPI_onTicTag(productId, profileIdOnGolive) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/removeProductFromBagProductById/${productId}/`,
            {profileIdOnGolive},
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


export async function getDelieveryCostByZipCodeAPI_onTicTag(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${tictagBaseUrl}golive/getDelieveryCostByZipCode/`,
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
