import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {

  if(props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.design || 'primary-bg'} ${props.size || ''}`}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    )
  }

  return (
    <button
      className={`button button--${props.design || 'primary-bg'} ${props.size || ''} ${props.className || ''}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
