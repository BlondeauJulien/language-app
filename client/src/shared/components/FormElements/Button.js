import React from 'react';

import './Button.css';

const Button = props => {
  return (
    <button
      className={`button button--${props.design || 'primary-bg'} ${props.size || ''}`}
      type={props.type}
    >
      {props.children}
    </button>
  )
}

export default Button
