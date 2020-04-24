import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

import './AuthForm.css';

const AuthForm = props => {
  const { authForm, setAuthForm } = props;

  return (
    <form className="auth-form">
      <div className="auth-form-header">
        <h3>{authForm.component === 'login' ?  'Log in now' : 'Create your account now'}</h3>
        <div>
          {authForm.component === 'login' ?  `Don't have an account? ` : `Already have an account? `}
          <Button 
            onClick={() => authForm.component === 'login' ? 
              setAuthForm({...authForm, component: 'signup'}) :
              setAuthForm({...authForm, component: 'login'})
            } 
            type={'button'} 
            design={'plain-text'}
          >
          {authForm.component === 'login' ?  `SIGN UP` : `LOG IN`}
          </Button>
        </div>
      </div>
      {authForm.component === 'signup' && (
        <Input element={'input'} type={'text'} placeholder={'Name'} wrapperDesign={'auth'}/>
      )}
      <Input element={'input'} type={'email'} placeholder={'Email'} wrapperDesign={'auth'}/>
      <Input element={'input'} type={'password'} placeholder={'Password'} wrapperDesign={'auth'}/>
      <div className="auth-submit-btn-container">
        <Button 
          type={'submit'} 
          size={'button-full-length'}
        >
          {authForm.component === 'login' ?  `LOG IN` : `SIGN UP`}
        </Button>
      </div>
    </form>
  )
}

export default AuthForm;
