import React, { useContext, useState } from 'react';
import validator from 'validator';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Flags from '../../shared/util/countriesFlags';
import FlagsList from './FlagsList';
import FlagPicked from './FlagPicked';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';

import './CourseForm.css';

const CourseForm = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);

  const { createCourse } = courseContext;
  const { token } = authContext

  const formInitialState = {
		name: { value: '', isValid: false, isTouched: false },
		language: { value: '', isValid: false, isTouched: false },
		learningFrom: { value: '', isValid: false, isTouched: false },
		countryFlag: { value: '', isValid: false, isTouched: true },
	}

  const [ formHasError, setFormHasError ] = useState(false);
  const [ form, setForm ] = useState(formInitialState);

  const onChange = e => {
    const id = e.target.id;
    const value = e.target.value;

    setFormHasError(false);
/*     if(error) {
      setAuthError(false);
    } */
		setForm({...form, [id]: {...form[id], value: value, isValid: validate(value, id)}});
  }

  const pickFlagHandler = flagCode => {
    setForm({...form, countryFlag: {...form.countryFlag, value: flagCode, isValid: validate(flagCode, 'countryFlag')}});
  }

  const validate = (value, id) => {
    if(id === 'name') return validator.isLength(value, {min: 4, max: 40});
    if(id === 'language') return validator.isLength(value, {min: 2, max: 24});
    if(id === 'learningFrom') return validator.isLength(value, {min: 2, max: 24});
    if(id === 'countryFlag') {
      for(let i = 0; i < Flags.length; i++) {
        if(Flags[i].code === value) {
          return true;
        }
      }
      return false;
    }
  }

  const onTouchHandler = e => {
		setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});

  }

  const onSubmit = e => {
    e.preventDefault();
    for(const input in form) {
      if(!form[input].isValid) {
        setFormHasError(true);
        return;
      }
    }

    const formToSend = {
      name: form.name.value,
      language: form.language.value,
      learningFrom: form.learningFrom.value,
      countryFlag: form.countryFlag.value
    }

    createCourse(formToSend, token);
  }
  
	return (
		<form onSubmit={onSubmit}>
			<h2 className="main-form__title">Create your course</h2>
			<div className="main-form__input-container">
				<Input
          id={'name'}
          value={form.name && form.name.value}
          onChange={onChange}
					element={'input'}
					type={'text'}
					label={'Course name'}
					placeholder={"Ex: 'Learn Norwegian from English' or 'Learn color in french'"}
          size={'input-full'}
          onTouchHandler={onTouchHandler}
          isTouched={form.name && form.name.isTouched}
          isValid={form.name && form.name.isValid}
          inputErrorMessage={'Course name should contain between 2 and 40 characters.'}
				/>
			</div>
			<div className="main-form__input-container">
				<Input
          id={'language'}
          value={form.language && form.language.value}
          onChange={onChange}
					element={'input'}
					type={'text'}
					label={'Learn'}
					placeholder={'Irish, Arabic, Vietnamese...'}
          size={'input-full'}
          onTouchHandler={onTouchHandler}
          isTouched={form.language && form.language.isTouched}
          isValid={form.language && form.language.isValid}
          inputErrorMessage={'Language name should contain between 2 and 24 characters.'}
				/>
			</div>
			<div className="main-form__input-container">
				<Input
          id={'learningFrom'}
          value={form.learningFrom && form.learningFrom.value}
          onChange={onChange}
					element={'input'}
					type={'text'}
					label={'Learn From'}
          placeholder={'English, Spanish, Chinese...'}
          size={'input-full'}
          onTouchHandler={onTouchHandler}
          isTouched={form.learningFrom && form.learningFrom.isTouched}
          isValid={form.learningFrom && form.learningFrom.isValid}
          inputErrorMessage={'Language name should contain between 4 and 24 characters.'}
				/>
			</div>
			<div className="main-form__input-container">
				<label className="label-default">PICK A FLAG</label>
        {
          form.countryFlag.value ? (
            <FlagPicked flag={form.countryFlag.value} resetFlag={() => pickFlagHandler('')}/>
          ) : (
            <FlagsList pickFlagHandler={pickFlagHandler}/>
          )
        }
			</div>
			<div className="main-form__button-container">
				<Button>Create</Button>
			</div>

      {
        formHasError && (
          <p className="form-submit-error-message">
            Please fill the form properly before submitting, don't forgot to pick a flag
          </p>
        )
      }
		</form>
	);
};

export default CourseForm;
