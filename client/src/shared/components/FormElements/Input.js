import React, { Fragment } from 'react';

import './Input.css';

const Input = props => {

  const element = 
    props.element === 'input' ? (
      <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder} 
      />
    ) : (
      <textarea 
				id={props.id} 
				rows={props.rows || 3} 
			/>
    )


  return (
    <Fragment>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <div className={`input-wrapper-${props.wrapperDesign || 'search'}`}>
        {props.logo}
        {element}
      </div>
    </Fragment>
  )
}

export default Input
