import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const TagsInput = props => {
  return (
    <div className={props.containerClassName}>
      <Input
        element={'input'}
        type={'text'}
        label={'Tags'}
        placeholder={props.placeholder}
        size={'input-full'}
      />
      <span className="tags-info">Maximum of 8 tags, each separeted with a comma ","</span>
    </div>
  )
}

export default TagsInput
