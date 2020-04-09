import React from 'react';

import './CardsContainer.css';

const CardsContainer = props => {
  return (
    <div className="cards-container">
      {props.children}
    </div>
  )
}

export default CardsContainer
