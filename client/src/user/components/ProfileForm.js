import React, { useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

import './ProfileForm.css';
import validator from 'validator';

const ProfileForm = props => {
  const formInitialState = {
    username: { value: props.user.username, isValid: true, isTouched: false },
		email: { value: props.user.email, isValid: true, isTouched: false },
    password: { value: '', isValid: true, isTouched: false },
		currentPassword: { value: '', isValid: false, isTouched: false }
	}

  const [ formHasError, setFormHasError ] = useState(false);
  const [ form, setForm ] = useState(formInitialState);

  const onChange = e => {
    const id = e.target.id;
    const value = e.target.value;

    setFormHasError(false);
    if(props.error) {
      props.setAuthError(false);
    }
		setForm({...form, [id]: {...form[id], value: value, isValid: validate(value, id)}});
  }

  const onTouchHandler = e => {
    setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});
  }

  const validate = (value, id) => {
    if(id === 'username') return validator.isLength(value, {min: 4, max: 16});
    if(id === 'email') return validator.isEmail(value);
    if(id === 'password') return validator.isLength(value, {min: 6}) || validator.isEmpty(value);
    if(id === 'currentPassword') return validator.isLength(value, {min: 1});
  }

  const onSubmit = e => {
    e.preventDefault();
    const formToSend= {};

		for(const input in form) {
      if(!form[input].isValid) {
        setFormHasError(true);
        return;
      }

      if(form[input].value.trim() !== '') {
        formToSend[input] = form[input].value;
      }
    }

    props.editProfile(formToSend)
  }


	return (
		<form onSubmit={onSubmit} className="profile-form">
			<h3>Edit Profile</h3>
			<div className="profile-form__input-container">
        <Input 
          id={'username'}
          value={form.username.value}
          onChange={onChange}
          element={'input'} 
          type={'text'} 
          wrapperDesign={'auth'} 
          label={'USERNAME'} 
          onTouchHandler={onTouchHandler}
          isTouched={form.username && form.username.isTouched}
          isValid={form.username && form.username.isValid}
          inputErrorMessage={'Username should contains between 4 and 16 characters.'}
        />
			</div>
			<div className="profile-form__input-container">
        <Input 
          id={'email'}
          value={form.email.value}
          onChange={onChange}
          element={'input'} 
          type={'email'} 
          wrapperDesign={'auth'} 
          label={'EMAIL'} 
          onTouchHandler={onTouchHandler}
          isTouched={form.email.isTouched}
          isValid={form.email.isValid}
          inputErrorMessage={'You email is not valid. Please enter a valid email.'}
        />
			</div>
			<div className="profile-form__input-container">
        <Input 
          id={'password'}
          value={form.password.value}
          onChange={onChange}
          element={'input'} 
          type={'password'} 
          wrapperDesign={'auth'} 
          label={'NEW PASSWORD'} 
          onTouchHandler={onTouchHandler}
          isTouched={form.password.isTouched}
          isValid={form.password.isValid}
          inputErrorMessage={'If you want to change your password it should contains at least 6 characters. Else let the field empty.'}
        />
			</div>
			<div className="profile-form__input-container">
        <Input 
          id={'currentPassword'}
          value={form.currentPassword.value}
          onChange={onChange}
          element={'input'} 
          type={'password'} 
          wrapperDesign={'auth'} 
          label={'CURRENT PASSWORD'} 
          onTouchHandler={onTouchHandler}
          isTouched={form.currentPassword.isTouched}
          isValid={form.currentPassword.isValid}
          inputErrorMessage={'You need to enter you current password to send the changes.'}
        />
			</div>
			<div className="profile-form__submit-container">
				<Button type="submit">Save Changes</Button>
			</div>

      {
        formHasError && (
          <p className="form-submit-error-message">
            Please fill the form properly before submitting. Don't forgot to fill your current password.
          </p>
        )
      }

      { // backend error
        props.error && (
          <p className="form-submit-error-message">
            {props.error}
          </p>
        )
      }
		</form>
	);
};

export default ProfileForm;
