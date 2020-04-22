import React, { Fragment } from 'react';

import './Input.css';

const Input = props => {

  const element = 
    props.element === 'input' ? (
      <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder}
        min={props.minValue}
        max={props.maxValue}
        minLength={props.minValue}
        maxLength={props.maxValue}
      />
    ) : (
      <textarea 
				id={props.id} 
        rows={props.rows || 3} 
        placeholder={props.placeholder}
			/>
    )


  return (
    <Fragment>
      {props.label && <label htmlFor={props.id} className={`label-${props.labelDesign || 'default'}`}>{props.label}</label>}
      <div className={`input-wrapper-${props.wrapperDesign || 'search'} ${props.size ? props.size : ''}`}>
        {props.logo}
        {element}
      </div>
    </Fragment>
  )
}

export default Input
