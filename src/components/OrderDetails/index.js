import React, { useState } from 'react';
import './style.css';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import { getUserOrderDetailsByIdAPI } from '../../apis/common';
import OrderDetailsProductCard from '../OrderDetailsProductCard';
import PullToRefresh from 'react-simple-pull-to-refresh';
const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
let currentStoreCurrency = localStorage.getItem('currentStoreCurrency');
if (!currentStoreCurrency) currentStoreCurrency = 'R$';

export const loader = async ({ params }) => {
    let data;
    await getUserOrderDetailsByIdAPI(params.orderId).then(res=>{
        if(res.data.status === "success"){
            data = res.data.data;
        }else toast.error(res.data.error[language]);
    }).catch(err=>toast.error(err.message));
    if(!!data) return {"loadedData": data};
    return redirect(`/${params.storeId}/list`);
}

function OrderDetails() {

    let color = 'var(--user-primary)';
    const [t,] = useTranslation("orderDetails");
    const { loadedData } = useLoaderData();
    const [data, setData] = useState(loadedData);

    const reloadFunction = async () => {
        await getUserOrderDetailsByIdAPI(data.id).then(res=>{
            if(res.data.status === "success"){
                setData(res.data.data);
            }else toast.error(res.data.error[language]);
        }).catch(err=>toast.error(err.message));
    }

    return (
        <PullToRefresh onRefresh={reloadFunction}>
            <div className='OrderDetails'>
                <div className='OrderDetails-total-div-container'>
                    <h5 className='OrderDetails-head'  style={{color: `${color}`}}>{t("orderId")} {data.id}</h5>
                    {/* <h5 className='OrderDetails-head'  style={{color: `${color}`}}>{t("orderNo")} {data.order_number}</h5> */}
                </div>
                {data.products.map((product, index)=><OrderDetailsProductCard key={index} product={product} />)}
                {/* <div className='OrderDetails-total-div-container'>
                    <p style={{color: `${color}`}}>{t("delivery_type")}</p>
                    <p style={{color: `${color}`}}>{data.order_type==="ENTREGA" ? t("delivery_type-txt.ENTREGA"): t("delivery_type-txt.else")}</p>
                </div> */}
                <div className='OrderDetails-total-div-container'>
                    <p style={{color: `${color}`}}>{t("subtotal")}</p>
                    <p style={{color: `${color}`}}>{currentStoreCurrency}: {currencyConverter((data.subtotal_in_paisa) / 100, currentStoreCurrency)}</p>
                </div>
                <div className='OrderDetails-total-div-container'>
                    <p style={{color: `${color}`}}>{t("DeliveryCost")}</p>
                    <p style={{color: `${color}`}}>{currentStoreCurrency}: {currencyConverter((data.delievery_charges_in_paisa) / 100, currentStoreCurrency)}</p>
                </div>
                <div className='OrderDetails-total-div-container'>
                    <p style={{color: `${color}`}}>{t("total")}</p>
                    <p style={{color: `${color}`}}>{currentStoreCurrency}: {currencyConverter((data.total_in_paisa) / 100, currentStoreCurrency)}</p>
                </div>
                <div className='OrderDetails-total-div-container'>
                    <p style={{color: `${color}`}}>{t("status")}</p>
                    <p style={{color: `${data.is_confirmed? 'green': 'red'}`}}>{data.is_confirmed ? t("status-txt.paid"): t("status-txt.pending")}</p>
                </div>

                <div className='OrderDetails-total-div-container'>
                    <p style={{color: `${color}`}}>{t("delivery-status")}</p>
                    <p style={{color: `${data.is_delivered? 'green': 'orange'}`}}>{data.is_delivered ? t("delivery-status-txt.delivered"): t("delivery-status-txt.pending")}</p>
                </div>

                <div className='OrderDetails-total-div-container-address'>
                    <h4 style={{color: `${color}`}}>{t("address.drop-head")}</h4>
                    <table>
                        <tbody>

                            {data.drop_address && <>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.country")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.country}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.state")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.state}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.city")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.city}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.zip")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.pincode}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.landmark")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.landmark}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.street")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.street}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.h_no")}:</p></td>
                                    <td><p style={{color: `${color}`}}>{data.drop_address.house_number}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{color: `${color}`}}>{t("address.contact_no")}:</p></td>
                                    <td><p style={{color: `${color}`}}>
                                        <a href={`tel:${data.drop_address.phone}`}>{data.drop_address.phone}</a>
                                    </p></td>
                                </tr>
                            </>}
                        </tbody>
                    </table>
                </div>

                <div className='OrderDetails-total-div-container-address'>
                    <h4 style={{color: `${color}`}}>{t("address.supplier_contact_details")}</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.contact_no")}:</p></td>
                                <td><p style={{color: `${color}`}}>
                                    <a href={`tel:${data.supplier_contact}`}>{data.supplier_contact}</a>
                                </p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </PullToRefresh>
    )
}

export default OrderDetails