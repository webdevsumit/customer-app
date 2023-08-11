import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { markNotificationsAsReadAPI } from '../../apis/common';
import './style.css'
import { useNavigate } from 'react-router-dom';

let currentStoreDateFormat = localStorage.getItem('currentStoreDateFormat');
if(!!currentStoreDateFormat) currentStoreDateFormat =  'DD/MM/YYYY';
const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

function UserNotificationCard({
    notification,
}) {

    const [noti, setNoti] = useState(notification);
    const navigate = useNavigate();
    const [expandBox, setExpandBox] = useState(false);

    const markNotificationAsRead = async () => {
        await markNotificationsAsReadAPI(noti.id).then(res=>{
            if(res.data.status === "success"){
                toast.success(res.data.message[language]);
                setNoti(prevNoti=>{
                    return {...prevNoti, is_unread: false};
                })
            }else{
                toast.error(res.data.error[language])
            }
        }).catch(err=>toast.error(err.message));
    }

    return (
        <div className='UserNotificationCard' style={{backgroundColor: `${'var(--user-primary)'}`}}>
            <div className='UserNotificationCard-inner'>
                <div className='UserNotificationCard-text-div' onClick={()=>setExpandBox(true)} >
                    <p className='UserNotificationCard-text-date' >{moment(noti.date).format(`${currentStoreDateFormat} hh:mm a`)}</p>
                    <p className='UserNotificationCard-text' >{noti.title}</p>
                </div>
                <div className='UserNotificationCard-read-icon'>
                    {noti.is_unread ? <>
                        <img className='UserNotificationCard-read-icon-mail' onClick={markNotificationAsRead} src='/assets/icons/svgs/unReadMailWhite.svg' alt='read' />
                    </>:<>
                        <img className='UserNotificationCard-read-icon-readmail' src='/assets/icons/svgs/readMailWhite.svg' alt='read' />
                    </>}
                </div>
                <div className='UserNotificationCard-read-icon'>
                    {!!noti.link ? <>
                        <img className='UserNotificationCard-read-icon-mail' onClick={()=>navigate(noti.link)} src='/assets/icons/pngs/linkWhite.png' alt='read' />
                    </>:<>
                        <img className='UserNotificationCard-read-icon-readmail' src='/assets/icons/pngs/linkWhite.png' alt='read' />
                    </>}
                </div>
            </div>
            {expandBox && <p className='UserNotificationCard-text-desc' >{noti.description}</p>}
        </div>
    )
}

export default UserNotificationCard