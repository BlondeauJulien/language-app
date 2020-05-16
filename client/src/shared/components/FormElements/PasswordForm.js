import React from 'react';

import Input from './Input';
import Button from './Button';

const PasswordForm = props => {
  const { onSubmit, value, onChange, onCancel} = props

  return (
    <form onSubmit={onSubmit} className="user-infos__form-delete">
      <Input 
        element={'input'}
        type={'password'}
        id={'password'}
        value={value}
        onChange={onChange}
        placeholder={'password'}
        label={'Enter password to confirm.'}
        htmlFor={'password'}
      />
      <Button type={'submit'}>DELETE</Button>
      <Button type={'button'} onClick={onCancel}>Cancel</Button>
    </form>
  )
}

export default PasswordForm
