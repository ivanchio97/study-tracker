import React from 'react'

const ProgressBar = ({value = 0}) => {
  return(
    <div className="progress">
      <div 
        className="progress-bar" 
        role="progressbar" 
        style={{width: `${value}%`}}
        aria-valuenow={value} 
        aria-valuemin="0" 
        aria-valuemax="100">
          {value}%
      </div>
    </div>
  )
}
export default ProgressBar