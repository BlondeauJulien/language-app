import React from 'react';

import Button from '../FormElements/Button';

import './CardsContainerHeader.css'

const CardsContainerHeader = props => {
  return (
    <div className="cards-container-header">
      <h3>{props.title}</h3>
      <Button type={'button'} design={"plain-text"}>SEE ALL COURSES</Button>
    </div>
  )
}

export default CardsContainerHeader
