import React from 'react'
import './style.css'

function FancyButton1({
    label="SIGNUP",
    onClick
}) {
  return (
    <div className='FancyButton1'>
        <button 
            onClick={onClick}
            className="FancyButton1-button-64" 
            // role="button"
        >
            <span className="text">{label}</span>
        </button>
    </div>
  )
}

export default FancyButton1