import React, { useContext, useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import FlagsList from './FlagsList';
import FlagPicked from './FlagPicked';
import CourseContext from '../../context/course/courseContext';

import './CourseForm.css';

const CourseForm = () => {
  const courseContext = useContext(CourseContext);

  const formInitialState = {
		name: { value: '', isValid: false, isTouched: false },
		language: { value: '', isValid: false, isTouched: false },
		learningFrom: { value: '', isValid: false, isTouched: false },
		countryFlag: { value: 'FR', isValid: false, isTouched: false },
	}

  const [ formHasError, setFormHasError ] = useState(false);
  const [ form, setForm ] = useState(formInitialState);
  
	return (
		<form>
			<h2 className="main-form__title">Create your course</h2>
			<div className="main-form__input-container">
				<Input
					element={'input'}
					type={'text'}
					label={'Course name'}
					placeholder={"Ex: 'Learn Norwegian from English' or 'Learn color in french'"}
					size={'input-full'}
				/>
			</div>
			<div className="main-form__input-container">
				<Input
					element={'input'}
					type={'text'}
					label={'Learn'}
					placeholder={'Irish, Arabic, Vietnamese...'}
					size={'input-full'}
				/>
			</div>
			<div className="main-form__input-container">
				<Input
					element={'input'}
					type={'text'}
					label={'Learn From'}
          placeholder={'English, Spanish, Chinese...'}
          size={'input-full'}
				/>
			</div>
			<div className="main-form__input-container">
				<label className="label-default">PICK A FLAG</label>
        {
          form.countryFlag.value ? (
            <FlagPicked flag={form.countryFlag.value}/>
          ) : (
            <FlagsList />
          )
        }
			</div>
			<div className="main-form__button-container">
				<Button>Create</Button>
			</div>
		</form>
	);
};

export default CourseForm;
