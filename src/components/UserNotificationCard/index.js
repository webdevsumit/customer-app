import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { markNotificationsAsReadAPI } from '../../apis/common';
import './style.css'

let currentStoreDateFormat = localStorage.getItem('currentStoreDateFormat');
if(!!currentStoreDateFormat) currentStoreDateFormat =  'DD/MM/YYYY';
const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

function UserNotificationCard({
    notification,
    onStore=false
}) {

    const [noti, setNoti] = useState(notification);

    const markNotificationAsRead = async () => {
        await markNotificationsAsReadAPI(noti.id).then(res=>{
            if(res.data.status === "success"){
                toast.success(res.data.message[language]);
                setNoti(prevNoti=>{
                    return {...prevNoti, isRead: true};
                })
            }else{
                toast.error(res.data.error[language])
            }
        }).catch(err=>toast.error(err.message));
    }

    return (
        <div className='UserNotificationCard' style={{backgroundColor: `${onStore? 'var(--store-primary)': 'var(--user-primary)'}`}}>
            <div className='UserNotificationCard-text-div'>
                <p className='UserNotificationCard-text-date' >{moment(noti.date).format(`${currentStoreDateFormat} hh:mm a`)}</p>
                <p className='UserNotificationCard-text' >{noti.text}</p>
            </div>
            <div className='UserNotificationCard-read-icon'>
                {noti.isRead ? <>
                    <img className='UserNotificationCard-read-icon-readmail' src='/assets/icons/svgs/readMailWhite.svg' alt='read' />
                </>:<>
                    <img className='UserNotificationCard-read-icon-mail' onClick={markNotificationAsRead} src='/assets/icons/svgs/unReadMailWhite.svg' alt='read' />
                </>}
            </div>
        </div>
    )
}

export default UserNotificationCard