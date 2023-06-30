import React, { useState } from 'react';
import './style.css';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { currencyConverter } from '../../actions/commons';
import { cancelTheOrderFromStoreByIdAPI, getUserOrderDetailsByIdAPI, setUserOrderDeliveredByIdAPI } from '../../apis/common';
import OrderDetailsProductCard from '../OrderDetailsProductCard';
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
    if(!!data) return {data};
    return redirect('/');
}

function OrderDetails({onStore=false}) {

    let color = onStore ? 'var(--store-primary)' : 'var(--user-primary)'
    const history = useNavigate();
    const [t,] = useTranslation("orderDetails");
    const { data } = useLoaderData();
    const [is_delivered, setIs_delivered] = useState(data.is_delivered)

    const setOrderDeliveredById = async () => {
        await setUserOrderDeliveredByIdAPI(data.id).then(res=>{
            if(res.data.status === "success"){
                toast.success(res.data.message[language]);
                setIs_delivered(true);
            }else toast.error(res.data.error[language]);
        }).catch(err=>toast.error(err.message));
    }

    const cancelOrderById = async () => {
        await cancelTheOrderFromStoreByIdAPI(data.id).then(res=>{
            if(res.data.status === "success"){
                history('/my-store/orders');
            }else toast.error(res.data.error[language]);
        }).catch(err=>toast.error(err.message));
    }

    return (
        <div className='OrderDetails'>
            <div className='OrderDetails-total-div-container'>
                <h5 className='OrderDetails-head'  style={{color: `${color}`}}>{t("orderId")} {data.id}</h5>
                <h5 className='OrderDetails-head'  style={{color: `${color}`}}>{t("orderNo")} {data.order_number}</h5>
            </div>
            {data.products.map((product, index)=><OrderDetailsProductCard key={index} product={product} onStore={onStore} />)}
            <div className='OrderDetails-total-div-container'>
                <p style={{color: `${color}`}}>{t("delivery_type")}</p>
                <p style={{color: `${color}`}}>{data.order_type==="ENTREGA" ? t("delivery_type-txt.ENTREGA"): t("delivery_type-txt.else")}</p>
            </div>
            <div className='OrderDetails-total-div-container'>
                <p style={{color: `${color}`}}>{t("subtotal")}</p>
                <p style={{color: `${color}`}}>{currentStoreCurrency}: {currencyConverter((data.subtotal_in_cent) / 100, currentStoreCurrency)}</p>
            </div>
            <div className='OrderDetails-total-div-container'>
                <p style={{color: `${color}`}}>{t("DeliveryCost")}</p>
                <p style={{color: `${color}`}}>{currentStoreCurrency}: {currencyConverter((data.delievery_charges) / 100, currentStoreCurrency)}</p>
            </div>
            <div className='OrderDetails-total-div-container'>
                <p style={{color: `${color}`}}>{t("total")}</p>
                <p style={{color: `${color}`}}>{currentStoreCurrency}: {currencyConverter((data.total_in_cent) / 100, currentStoreCurrency)}</p>
            </div>
            <div className='OrderDetails-total-div-container'>
                <p style={{color: `${color}`}}>{t("status")}</p>
                <p style={{color: `${data.is_completed? 'green': 'red'}`}}>{data.is_completed ? t("status-txt.paid"): t("status-txt.pending")}</p>
            </div>

            {onStore && !data.is_completed && <>
                <div className='OrderDetails-total-div-container-incompeteOrderMessage'>
                    <p style={{color: `${color}`}}>{t("incompeteOrderMessage")}</p>
                    <hr style={{width: `100%`}} />
                    <div className='OrderDetails-extra-btn-inline'>
                        <p className={`${onStore?'store-submit-button1':'user-submit-button1'} btn-success`}><a style={{fontWeight: 'bold', color: 'white', textDecoration: 'none'}} href={`tel:${data.customer_contact?.number}`}>{t("call")}: {data.customer_contact? data.customer_contact?.number.substring(7)+"...": ""}</a></p>
                        <p onClick={cancelOrderById} className={`${onStore?'store-submit-button1':'user-submit-button1'} btn-danger`}>{t("cancel")}</p>
                    </div>
                </div>
            </>}

            <div className='OrderDetails-total-div-container'>
                <p style={{color: `${color}`}}>{t("delivery-status")}</p>
                <p style={{color: `${is_delivered? 'green': 'orange'}`}}>{is_delivered ? t("delivery-status-txt.delivered"): t("delivery-status-txt.pending")}</p>
            </div>

            {onStore && !is_delivered && <>
                <div className='OrderDetails-total-div-container-incompeteOrderMessage'>
                    <div className='OrderDetails-extra-btn-inline'>
                        <p className={`${onStore?'store-submit-button1':'user-submit-button1'}`} onClick={setOrderDeliveredById} >{t("setDeliveredBtn")}</p>                    
                    </div>
                </div>
            </>}

            <div className='OrderDetails-total-div-container-address'>
                <h4 style={{color: `${color}`}}>{t("address.pick-head")}</h4>
                <table>
                    <tbody>

                        {data.products.length>0 && data.products[0].pick_address && <>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.country")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.country}</p></td>
                            </tr>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.state")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.state}</p></td>
                            </tr>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.city")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.city}</p></td>
                            </tr>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.zip")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.cep_or_pincode}</p></td>
                            </tr>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.landmark")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.landmark}</p></td>
                            </tr>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.street")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.street}</p></td>
                            </tr>
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.h_no")}:</p></td>
                                <td><p style={{color: `${color}`}}>{data.products[0].pick_address.house_number}</p></td>
                            </tr>
                        </>}
                        <tr>
                            <td><p style={{color: `${color}`}}>{t("address.contact_no")}:</p></td>
                            <td>
                                {data.store_contacts.map(contact=>
                                    <p key={contact.id} style={{color: `${color}`}}>
                                        <a href={`tel:${contact?.number}`}>{contact?.number}</a>,
                                    </p>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {data.order_type==="ENTREGA" && <>
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
                                    <td><p style={{color: `${color}`}}>{data.drop_address.cep_or_pincode}</p></td>
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
                            </>}
                            <tr>
                                <td><p style={{color: `${color}`}}>{t("address.contact_no")}:</p></td>
                                <td><p style={{color: `${color}`}}>
                                    <a href={`tel:${data.customer_contact?.number}`}>{data.customer_contact?.number}</a>
                                </p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>}
        </div>
    )
}

export default OrderDetails