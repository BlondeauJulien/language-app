import React from 'react';

import Button from '../FormElements/Button';

import './SuccessMessage.css';

const SuccessMessage = props => {
  const { redirectTo, message, btnText} = props;
  return (
    <div className="success-action-container">
      <p>{message}</p>
      <Button to={redirectTo} design={'primary-txt-white-bg'}>{btnText}</Button>
    </div>
  )
}

export default SuccessMessage;
