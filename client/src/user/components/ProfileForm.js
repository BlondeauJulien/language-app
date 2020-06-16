import React, { useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { defaultOnChangeWithValidation } from '../../shared/util/sharedFormFunctions';
import resetFormErrors from '../../shared/util/resetFormErrors';
import FormErrorMessage from '../../shared/components/FormElements/FormErrorMessage';

import './ProfileForm.css';

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
		resetFormErrors(setFormHasError, props.setAuthError, props.error);
    defaultOnChangeWithValidation(e.target.id, e.target.value, form, setForm);
  }

  const onTouchHandler = e => {
    setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});
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
          <FormErrorMessage
            message={'Please fill the form properly before submitting. Don\'t forgot your current password.'}
          />
        )
      }

      { // backend error
        props.error && (
          <FormErrorMessage message={props.error} />
        )
      }
		</form>
	);
};

export default ProfileForm;
