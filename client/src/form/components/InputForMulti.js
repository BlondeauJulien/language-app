import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const InputForMulti = props => {
  return (
    <div>
      {
        props.displayDeleteButton && (
          <div className="delete-cross">
            <i className="fas fa-times" onClick={() => props.onDeleteInputForMulti(props.id)}/>
          </div>
        )
      }
      
      <Input
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        element={'input'}
        type={'text'}
        label={props.label}
        placeholder={props.placeholder || ''}
        size={'input-full'}
        onTouchHandler={props.onTouchHandler}
        isTouched={props.isTouched}
        isValid={props.isValid}
        inputErrorMessage={props.inputErrorMessage}
      />
    </div>
  )
}

export default InputForMulti
