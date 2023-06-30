import React, { useState } from 'react';
import './style.css';

function FeedBackContainer({submitText="SUBMIT", onSubmit}) {

    const [text, setText] = useState("");

    return (
        <div className='FeedBackContainer'>
            <textarea 
                rows={10}
                cols="100%"
                className='FeedBackContainer-textarea'
                value={text}
                onChange={e=>setText(e.target.value)}
            ></textarea>
            <p className='store-submit-button1 w-100 FeedBackContainer-btn' onClick={()=>onSubmit(text)}>{submitText}</p>
        </div>
    )
}

export default FeedBackContainer