import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const InputForMulti = props => {
  return (
    <div>
      <div className="delete-cross">
        <i className="fas fa-times" />
      </div>
      <Input
        element={'input'}
        type={'text'}
        label={props.label}
        placeholder={props.placeholder || ''}
        size={'input-full'}
      />
    </div>
  )
}

export default InputForMulti
