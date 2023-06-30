import React from 'react'
import './style.css';

function GlobalLoader() {
  return (
    <div className='GlobalLoader'>
        <div className="GlobalLoader_contener_general">
            <div className="GlobalLoader_contener_mixte"><div className="GlobalLoader_ballcolor GlobalLoader_ball_1">&nbsp;</div></div>
            <div className="GlobalLoader_contener_mixte"><div className="GlobalLoader_ballcolor GlobalLoader_ball_2">&nbsp;</div></div>
            <div className="GlobalLoader_contener_mixte"><div className="GlobalLoader_ballcolor GlobalLoader_ball_3">&nbsp;</div></div>
            <div className="GlobalLoader_contener_mixte"><div className="GlobalLoader_ballcolor GlobalLoader_ball_4">&nbsp;</div></div>
        </div>
    </div>
  )
}

export default GlobalLoader