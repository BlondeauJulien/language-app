import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const TagsInput = props => {
  const {
    id,
    value,
    onChange,
    placeholder,
    onTouchHandler,
    isTouched,
    isValid,
    inputErrorMessage
  } = props;

  return (
    <div className={props.containerClassName}>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        element={'input'}
        type={'text'}
        label={'Tags'}
        placeholder={placeholder}
        size={'input-full'}
        onTouchHandler={onTouchHandler}
        isTouched={isTouched}
        isValid={isValid}
        inputErrorMessage={inputErrorMessage}
      />
      <span className="tags-info">Maximum of 8 tags, each separated with a comma ","</span>
    </div>
  )
}

export default TagsInput
