import React from 'react';

import './InfoElement.css';

const InfoElement = props => {
  return (
    <div className="profile-info-element">
      <h4 className="info-title">{props.title}</h4>
      <div className="profile-info">
        <span>{props.infoValue}</span>
      </div>
    </div>
  )
}

export default InfoElement
