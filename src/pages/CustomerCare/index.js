import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { getCustomerCareDataAPI } from '../../apis/common';
import { toast } from 'react-hot-toast';
import './style.css'

// const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async ({ params }) => {
    return { storeId: params.storeId }
}


function CustomerCare() {

    const { storeId } = useLoaderData();
    const [data, setData] = useState(null);

    const fetchContact = async () => {
        await getCustomerCareDataAPI(storeId).then(res=>{
            if(res.data.status === "success"){
                setData(res.data.data);
            }else toast.error(res.data.message);
        }).catch(err=>toast.error(err.message));
    }

    useEffect(()=>{
        fetchContact();
        // eslint-disable-next-line
    },[])

    if(!!data)
        return(<div className='CustomerCare'>
            <a href={`tel:${data.number}`}>Call on: {data.number}</a>
        </div>)

    return (
        <div>
            loading...
        </div>
    )
}

export default CustomerCare