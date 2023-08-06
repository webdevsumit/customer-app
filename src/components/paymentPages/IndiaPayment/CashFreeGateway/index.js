import React, { useState } from 'react';
import './style.css';
import { load } from '@cashfreepayments/cashfree-js';
import { useEffect } from 'react';

const cashfree = await load({
    mode: "sandbox" //or production
});

let style = {
    base: {
        fontSize: "22px"
    }
}

const paymentAppNames = [
    {"id": "phonepe", "name": "PhonePe"},
    {"id": "paytm", "name": "Paytm"},
    {"id": "gpay", "name": "Google Pay"},
    {"id": "default", "name": "Intent"},
    {"id": "web", "name": "Link"},
]

function CashFreeGateway() {

    const [components, setComponents] = useState({});
    
    useEffect(()=>{
        paymentAppNames.forEach( paymentApp => {
    
            let upiApp = paymentApp.id;
            let component = cashfree.create('upiApp', {
                values: {
                    upiApp: upiApp,
                },
                style
            });
            component.mount("#" + upiApp);
            component.on("click", function () {
                initPay(component)
            });
            component.on("loaderror", function (data) {
                console.log(data.error.message);
            });
            let tempObjs = components;
            tempObjs[upiApp] = component;
            setComponents(tempObjs);
        });

        // eslint-disable-next-line
    }, []);


    function initPay(comp) {
        comp.disable();
        cashfree.pay({
            paymentMethod: comp,
            paymentSessionId: "session_Uy50NCxSTHSWP0ealolN-GmUoPhZaoRlDiwn5pQS8DhvyaFW8L183Xo4DWk0q8ERMmAbc-mfU-7WGY88ZN8kD31rr3nLeng7v83RpZWwbSYZ",
            returnUrl: "https://nativeappsai.com",
            redirect: "if_required"
        }).then(function (data) {
            comp.enable();
            console.log("data: ", data);
            //data.message -> payment message success
            //data.error -> payment error
            // data.redirect -> is redirected
            if (data.error) {
                console.log("alert-danger: ", data.error.message);
            }
            if (data.paymentDetails) {
                console.log("alert-success: ", data.paymentDetails.paymentMessage);
            }
            if (data.redirect) {
                console.log("We are redirtion");
            }
        });
    }

    useEffect(()=>{
        console.log("components: ", components);
    }, [components])

    return (
        <div id='CashFreeGateway'>
            <div className="card-body pb-0">
                <h5 className="card-title">Select APP</h5>

                <div className="row">
                    {paymentAppNames.map(paymentAppName=>
                        <div key={paymentAppName.id} className="col-6 bank col" onClick={()=>initPay(components[paymentAppName.id])}>
                            <div className="btext">{paymentAppName.name}</div>
                        </div>
                        )}

                </div>
            </div>
        </div>
    )
}

export default CashFreeGateway