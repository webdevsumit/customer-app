import React from 'react'
import './style.css'

function NormalInput({
    placeholder="placeholder",
    value="",
    onChange,
    classNames,
    type="text",
}) {
  return (
    <div className='NormalInput'>
        <input
            type={type}
            className={'NormalInput-input ' + classNames}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
    </div>
  )
}

export default NormalInput