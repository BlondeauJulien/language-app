import React from 'react';

import './FormErrorMessage.css';

const FormErrorMessage = props => {
  return (
    <p className="form-submit-error-message">
      {props.message ? props.message : 'Please fill the form properly before submitting'}
    </p>
  )
}

export default FormErrorMessage
