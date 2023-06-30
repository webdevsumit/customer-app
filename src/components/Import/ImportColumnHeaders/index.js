import React from 'react'
import './style.css'

function ImportColumnHeaders({
    labelminWidth = '100px',
}) {
  return (
    <div className='ImportColumnHeaders'>
        <div>
          <h4 className='ImportColumnHeaders-label'style={{minWidth:labelminWidth}}>FIELD NAMES</h4>
          <div className='ImportColumnHeaders-select-wrapper'>
            <h4 className='ImportColumnHeaders-label'style={{minWidth:labelminWidth}}>SELECTIONS</h4>
          </div>
        </div>
        <h4 className='ImportColumnHeaders-example-text ImportColumnHeaders-label'>EXAMPLE PREVIEWS</h4>
    </div>
  )
}

export default ImportColumnHeaders