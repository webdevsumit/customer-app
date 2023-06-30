import React from 'react'
import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { signOutdApi } from '../../apis/common';
import './style.css'


export async function loader() {
    let isAuthenticated = true;

    await signOutdApi().then((res) => {
        if(res.data.status === 'success'){
            isAuthenticated = false;
        }
    }).catch(err => toast.error(err.message));

    if (isAuthenticated) return { redirectTo: '/' };
    localStorage.clear();
    return redirect('/landing');
}

function SignOut() {
  return (
    <div>Failed</div>
  )
}

export default SignOut