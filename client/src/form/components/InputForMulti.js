import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const InputForMulti = props => {
  const {
    displayDeleteButton,
    onDeleteInputForMulti,
    id,
    value,
    onChange,
    label,
    placeholder,
    onTouchHandler,
    isTouched,
    isValid,
    inputErrorMessage
  } = props;
  return (
    <div>
      {
        displayDeleteButton && (
          <div className="delete-cross">
            <i className="fas fa-times" onClick={() => onDeleteInputForMulti(id)}/>
          </div>
        )
      }
      
      <Input
        id={id}
        value={value}
        onChange={onChange}
        element={'input'}
        type={'text'}
        label={label}
        placeholder={placeholder || ''}
        size={'input-full'}
        onTouchHandler={onTouchHandler}
        isTouched={isTouched}
        isValid={isValid}
        inputErrorMessage={inputErrorMessage}
      />
    </div>
  )
}

export default InputForMulti
