import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import FlagsList from './FlagsList';

import './CourseForm.css';

const CourseForm = () => {
	return (
		<form>
			<h2 className="main-form__title">Course</h2>
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
          placeholder={'English, Spanish, chinese...'}
          size={'input-full'}
				/>
			</div>
			<div className="main-form__input-container">
				<label className="label-default">PICK A FLAG</label>
				<FlagsList />
			</div>
			<div className="main-form__button-container">
				<Button>Create</Button>
			</div>
		</form>
	);
};

export default CourseForm;
