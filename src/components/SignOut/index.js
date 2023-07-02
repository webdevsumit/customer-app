import React from 'react'
// import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import './style.css'

const storeId = localStorage.getItem("storeId");

export async function loader() {
    localStorage.clear();
    return redirect(`/${storeId}/landing`);
}

function SignOut() {
  return (
    <div>Failed</div>
  )
}

export default SignOut