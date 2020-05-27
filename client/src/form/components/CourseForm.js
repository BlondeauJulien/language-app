import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import FlagsList from './FlagsList';
import FlagPicked from './FlagPicked';
import Spinner from '../../shared/SVGImages/Spinner';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';
import validate from '../../shared/util/inputValidation';
import { courseInitialFormState } from '../util/formInitialStates';

import './CourseForm.css';

const CourseForm = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { 
    createCourse, 
    loading, 
    success, 
    resetCourseSuccess, 
    setCourseError, 
    error, 
    courseToEdit, 
    editCourse,
    clearCourseToEdit, 
    currentCourse, 
    selectCourse 
  } = courseContext;
  const { token } = authContext;

  const [ formHasError, setFormHasError ] = useState(false);
  const [ form, setForm ] = useState(courseInitialFormState);
  const [ countryFlag, setCountryFlag ] = useState({ value: '', isValid: false });

  useEffect(() => {
    if(success && currentCourse) {
      resetCourseSuccess();
      history.push('/course');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ success, currentCourse ]);

  useEffect(() => {
    if(courseToEdit) {
      setForm({
        ...form,
        name: {...form.name, value: courseToEdit.name, isValid: true},
        language: {...form.language, value: courseToEdit.language, isValid: true},
        learningFrom: {...form.learningFrom, value: courseToEdit.learningFrom, isValid: true}
      });
      setCountryFlag({...countryFlag, value: courseToEdit.countryFlag, isValid: true});
    }

    return () => {
      clearCourseToEdit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ courseToEdit ])

  useEffect(() => {
    let errorTimer;
    if(error) {
      errorTimer = setTimeout(() => {
        setCourseError(null);
      }, 10000);
    }

    return () => {
      clearTimeout(errorTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onClickBackToCourse = () => {
    selectCourse(courseToEdit)
  }

  const onChange = e => {
    const id = e.target.id;
    const value = e.target.value;

    setFormHasError(false);
    if(error) {
      setCourseError(false);
    }
    setForm({...form, [id]: {...form[id], value: value, isValid: validate(value, id)}});
  }

  const pickFlagHandler = flagCode => {
    setFormHasError(false)
    setCountryFlag({...countryFlag, value: flagCode, isValid: validate(flagCode, 'countryFlag')})
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
    if(!countryFlag.isValid){
      setFormHasError(true);
      return
    }

    const formToSend = {
      name: form.name.value,
      language: form.language.value,
      learningFrom: form.learningFrom.value,
      countryFlag: countryFlag.value
    }

    courseToEdit ? 
    editCourse(courseToEdit._id, formToSend, token) 
    : 
    createCourse(formToSend, token);
  }
  
	return (
		<form onSubmit={onSubmit}>
			<h2 className="main-form__title">{courseToEdit ? 'Edit' : 'Create'} your course</h2>
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
          countryFlag.value ? (
            <FlagPicked flag={countryFlag.value} resetFlag={() => pickFlagHandler('')}/>
          ) : (
            <FlagsList pickFlagHandler={pickFlagHandler}/>
          )
        }
			</div>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className="main-form__button-container">
            {courseToEdit && (
              <Button type={'button'} onClick={onClickBackToCourse}>Back to course</Button>
            )}
            <Button type={'submit'} design={'green'}>{courseToEdit ? 'Edit' : 'Create'}</Button>
          </div>
        )
      }


      {
        formHasError && (
          <p className="form-submit-error-message">
            Please fill the form properly before submitting, don't forgot to pick a flag
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

export default CourseForm;
