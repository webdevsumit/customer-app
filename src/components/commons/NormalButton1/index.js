import React from 'react'
import './style.css'

function NormalButton1({
    label="SIGNUP",
    onClick,
    classNames = ""
}) {
  return (
    <button onClick={onClick} className={"NormalButton1 " + classNames}>
        {label}
    </button>
  )
}

export default NormalButton1