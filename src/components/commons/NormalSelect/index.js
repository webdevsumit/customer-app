import React from 'react';
import './style.css';

function NormalSelect({
    value,
    onChange,
    classNames="",
    disabled=false,
    name="",
    placeholder="",
    isValid=true,
    label="",
    options=[
        {
            value: "No data",
            label: "No data"
        }
    ]
}) {
  return (
    <div className='NormalSelect'>
         {!!label && <>
          <h6 className="NormalInput-label">{label}</h6>
        </>}
        <select
            className={'NormalSelect-input ' + classNames + (isValid?(!!value?" NormalSelect-validField":" NormalSelect-placeholder"):" NormalSelect-invalidFiled")}
            value={value}
            onChange={onChange}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
        >
            <option disabled value="" className='NormalSelect-placeholder'> -- ({!!placeholder? placeholder : 'selecione'}) -- </option>
            {options.map((op, i)=><option key={i} value={op.value} >{op.label}</option>)}
        </select>
    </div>
  )
}

export default NormalSelect;