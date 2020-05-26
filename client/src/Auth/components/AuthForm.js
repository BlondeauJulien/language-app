import React, { useState, useEffect, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../../shared/SVGImages/Spinner';
import validate from '../../shared/util/inputValidation';

import './AuthForm.css';

const AuthForm = (props) => {
  const authContext = useContext(AuthContext);

  const { authForm, setAuthForm } = props;
  const { signup, signin, loading, user, error, setAuthError } = authContext;

  const formInitialState = {
		email: { value: '', isValid: false, isTouched: false },
		password: { value: '', isValid: false, isTouched: false }
	}

  const [ formHasError, setFormHasError ] = useState(false);
  const [ form, setForm ] = useState(formInitialState);
  
  useEffect(() => {
    if(user) {
      setAuthForm({ ...authForm, show: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

	useEffect(() => {
    if (authForm.component === 'signup') {
      const formSignup = { ...form, username: { value: '', isValid: false, isTouched: false } };
      setForm(formSignup);
    } else {
      const formSignin = { ...form };
      delete formSignin.username;

      setForm(formSignin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ authForm ]);
  
  useEffect(() => {
    let errorTimer
    if(error) {
      errorTimer = setTimeout(() => {
        setAuthError(false);
      }, 10000);
    }

    return () => {
      clearTimeout(errorTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

	const onTouchHandler = e => {
		setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});
  };
  
  const onChange = e => {
    const id = e.target.id;
    const value = e.target.value;

    setFormHasError(false);
    if(error) {
      setAuthError(false);
    }
		setForm({...form, [id]: {...form[id], value: value, isValid: validate(value, id)}});
  }

	const onSubmit = (e) => {
		e.preventDefault();
		for(const input in form) {
      if(!form[input].isValid) {
        setFormHasError(true);
        return;
      }
    }

    const formToSend = {
      email: form.email.value,
      password: form.password.value
		}
		if (authForm.component === 'login') {
			signin(formToSend);
		} else {
			formToSend.username = form.username.value;
			signup(formToSend);
		}
  };

	return (
		<form onSubmit={onSubmit} className="auth-form">
			<div className="auth-form-header">
				<h3>{authForm.component === 'login' ? 'Log in now' : 'Create your account now'}</h3>
				<div>
					{authForm.component === 'login' ? `Don't have an account? ` : `Already have an account? `}
					<Button
						onClick={() =>
							authForm.component === 'login'
								? setAuthForm({ ...authForm, component: 'signup' })
								: setAuthForm({ ...authForm, component: 'login' })}
						type={'button'}
						design={'plain-text'}
					>
						{authForm.component === 'login' ? `SIGN UP` : `LOG IN`}
					</Button>
				</div>
			</div>
			{authForm.component === 'signup' && (
				<Input
          id={'username'}
          value={form.username && form.username.value}
          onChange={onChange}
					element={'input'}
					type={'text'}
					placeholder={'Name'}
					wrapperDesign={'auth'}
          onTouchHandler={onTouchHandler}
          isTouched={form.username && form.username.isTouched}
          isValid={form.username && form.username.isValid}
          inputErrorMessage={'Username should contains between 4 and 16 characters.'}
				/>
			)}
			<Input
        id={'email'}
        value={form.email.value}
        onChange={onChange}
				element={'input'}
				type={'email'}
				placeholder={'Email'}
				wrapperDesign={'auth'}
        onTouchHandler={onTouchHandler}
        isTouched={form.email.isTouched}
        isValid={form.email.isValid}
        inputErrorMessage={'You email is not valid. Please enter a valid email.'}
			/>
			<Input
        id={'password'}
        value={form.password.value}
        onChange={onChange}
				element={'input'}
				type={'password'}
				placeholder={'Password'}
				wrapperDesign={'auth'}
        onTouchHandler={onTouchHandler}
        isTouched={form.password.isTouched}
        isValid={form.password.isValid}
        inputErrorMessage={'Password should contains at least 6 characters.'}
			/>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className="auth-submit-btn-container">
            <Button type={'submit'} size={'button-full-length'}>
              {authForm.component === 'login' ? `LOG IN` : `SIGN UP`}
            </Button>
          </div>
        )
      }

      {
        formHasError && (
          <p className="form-submit-error-message">
            Please fill the form properly before submitting
          </p>
        )
      }

      { // backend error
        error && (
          <p className="form-submit-error-message">
            {error}
          </p>
        )
      }
		</form>
	);
};

export default AuthForm;
