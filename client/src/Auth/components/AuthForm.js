import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

import './AuthForm.css';

const AuthForm = () => {
  return (
    <form className="auth-form">
      <div className="auth-form-header">
        <h3>Create your account now</h3>
        <div>
          Already have an account?{` `}
          <Button type={'button'} design={'plain-text'}>LOG IN</Button>
        </div>
      </div>
      <Input element={'input'} type={'text'} placeholder={'Name'} wrapperDesign={'auth'}/>
      <Input element={'input'} type={'email'} placeholder={'Email'} wrapperDesign={'auth'}/>
      <Input element={'input'} type={'password'} placeholder={'Password'} wrapperDesign={'auth'}/>
      <div className="auth-submit-btn-container">
        <Button type={'submit'} size={'button-full-length'}>SIGN UP</Button>
      </div>
    </form>
  )
}

export default AuthForm;
