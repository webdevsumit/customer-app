import React from 'react'
import NormalSelect from '../../commons/NormalSelect'
import './style.css'

function ImportColumnSelector({
    columnLabel='Label',
    selectedValue='',
    labelminWidth = '100px',
    exapleLabel = "--------",
    onChange,
    selectOptions,
    tooltip="",
    placholder="-------"
}) {
  return (
    <div className='ImportColumnSelector'>
        <div>
          {/* <h4 className='ImportColumnSelector-text'>Este campo do TicTag</h4> */}
          <h4 className='ImportColumnSelector-label' title={tooltip} style={{minWidth:labelminWidth}}>{columnLabel}</h4>
          {/* <h4 className='ImportColumnSelector-text'>deve ser preenchido com essa coluna</h4> */}
          <div className='ImportColumnSelector-select-wrapper' title={tooltip} >
              <NormalSelect 
                  value={selectedValue}
                  onChange={onChange}
                  options={selectOptions}
                  placeholder={placholder}
              />
          </div>
        </div>
        <h4 className='ImportColumnSelector-example-text' title={tooltip} >{ exapleLabel.length>29? `${exapleLabel.substring(0,27)}...`: exapleLabel }</h4>


    </div>
  )
}

export default ImportColumnSelector