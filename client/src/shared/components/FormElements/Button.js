import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {

  if(props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.design || 'primary-bg'} ${props.size || ''}`}
      >
        {props.children}
      </Link>
    )
  }

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
