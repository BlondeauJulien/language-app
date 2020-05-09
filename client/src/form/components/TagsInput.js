import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const TagsInput = props => {
  return (
    <div className={props.containerClassName}>
      <Input
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        element={'input'}
        type={'text'}
        label={'Tags'}
        placeholder={props.placeholder}
        size={'input-full'}
        onTouchHandler={props.onTouchHandler}
        isTouched={props.isTouched}
        isValid={props.isValid}
        inputErrorMessage={props.inputErrorMessage}
      />
      <span className="tags-info">Maximum of 8 tags, each separated with a comma ","</span>
    </div>
  )
}

export default TagsInput
