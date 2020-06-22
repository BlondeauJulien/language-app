import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import DualInput from './DualInput';
import InputForMulti from './InputForMulti';
import Button from '../../shared/components/FormElements/Button';
import TagsInput from './TagsInput'
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../../shared/SVGImages/Spinner';
import FormErrorMessage from '../../shared/components/FormElements/FormErrorMessage';
import { defaultOnChangeWithValidation } from '../../shared/util/sharedFormFunctions';
import { createVocabularyInitialFormState, fillFormWithWordToEdit } from '../util/formInitialStates';
import { createWordFormToSend } from '../util/createFormToSend';
import { formIsInvalid } from '../util/formError';
import { 
	changeDualInput, 
	addPhrase, 
	deleteDualInputEl, 
	changeInputForMulti, 
	deleteInputForMultiEl, 
	addTranslation, 
	touchHandlerInputForMulti } from '../util/formEvents';
import resetFormErrors from '../../shared/util/resetFormErrors';

import './VocabularyForm.css';

const VocabularyForm = () => {
	const courseContext = useContext(CourseContext);
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const { 
		currentCourse, 
		createVocabulary, 
		loading, 
		error, 
		setCourseError, 
		success, 
		resetCourseSuccess, 
		currentVocabulary,
		selectVocabulary,
		vocabularyToEdit,
		setWordToEdit,
		editVocabulary
	} = courseContext;
	const { token } = authContext;

	const [ formHasError, setFormHasError ] = useState(false);
	const [ form, setForm ] = useState(createVocabularyInitialFormState());
	
	useEffect(() => {
    if(currentVocabulary) {
      resetCourseSuccess();
      history.push('/word');
		}
		return () => {
			setWordToEdit(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ success, currentVocabulary ]);
	
	useEffect(() => {
		if(vocabularyToEdit) {
			setForm(fillFormWithWordToEdit(form, vocabularyToEdit));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ vocabularyToEdit ]);

	const onClickBackCourse = () => {
		history.push('/course');
	}

	const onClickBackToWord = () => {
		selectVocabulary(vocabularyToEdit);
	}

	const onChange = e => {
		resetFormErrors(setFormHasError, setCourseError, error);
    defaultOnChangeWithValidation(e.target.id, e.target.value, form, setForm);
	}

	const onChangeInputForMulti = e => {
		resetFormErrors(setFormHasError, setCourseError, error);
		const changedForm = changeInputForMulti(e, form);

		setForm(changedForm);
	}

	const onDeleteInputForMulti = element => {
		const changedForm = deleteInputForMultiEl(element, form);
		setForm(changedForm);
	}

	const onClickAddTranslation = () => {
		if(form.translation.length >= 8 ) return;
		const changedForm = addTranslation(form);
		setForm(changedForm);
	}
	
	const onTouchHandler = e => {
		setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});
	}
	
	const onTouchHandlerInputForMulti = e => {
		const changedForm = touchHandlerInputForMulti(e, form);
		setForm(changedForm);
	}

	const onChangeDualInput = e => {
		resetFormErrors(setFormHasError, setCourseError, error);
		const changedForm = changeDualInput(e, form);
		setForm(changedForm);
	}

	const onTouchHandlerDualInput = e => {
		const changedForm = changeDualInput(e, form);
		setForm(changedForm);
	}

	const onClickAddPhrase = () => {
		if(form.phrases.length >= 8 ) return;

		const changedForm = addPhrase(form);
		setForm(changedForm);
	}

	const onDeleteDualInput = element => {
		const changedForm = deleteDualInputEl(element, form);
		setForm(changedForm);
	}

	const onSubmit = e => {
		e.preventDefault();
    if(formIsInvalid(form)) {
			setFormHasError(true);
      return;
    }

    const formToSend = createWordFormToSend(form, currentCourse._id);

		vocabularyToEdit ? 
		editVocabulary( vocabularyToEdit._id ,formToSend, token) : 
		createVocabulary(formToSend, token)
	}

	if(!currentCourse) {
		history.push('/');
		return null
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className="main-form__title">
				{vocabularyToEdit ? 'Edit word' : `Add a word for: ${currentCourse.name}`}
			</h2>
			<div className="main-form__input-container">
				<Input 
					id={'word'}
					value={form.word && form.word.value}
					onChange={onChange}
					element={'input'} 
					type={'text'} 
					label={`Word*`} 
					size={'input-full'} 
					onTouchHandler={onTouchHandler}
          isTouched={form.word && form.word.isTouched}
          isValid={form.word && form.word.isValid}
					inputErrorMessage={'Word should contain between 1 and 30 characters.'}
				/>
			</div>
			<div className="main-form__input-container translations-container">
				<h3>Translations:</h3>
				{form.translation.map((el, i) => {
					return <InputForMulti 
						key={`translation-${i}`}
						id={`translation-${i}`}
						value={el.value}
						onChange={onChangeInputForMulti}
						label={`Translation ${i+1}*`}
						displayDeleteButton={form.translation.length > 1}
						onDeleteInputForMulti={onDeleteInputForMulti}
						onTouchHandler={onTouchHandlerInputForMulti}
						isTouched={el.isTouched}
						isValid={el.isValid}
						inputErrorMessage={'Translation should contain between 1 and 30 characters.'}
					/>
				})}
				{
					form.translation.length < 8 && (
						<Button type="button" onClick={onClickAddTranslation} size={'button-mid'} design={'green'}>
							<i className="fas fa-plus" /> Add a translation
						</Button>
					)
				}
			</div>
			<div className="main-form__input-container phrases-container">
				<h3>Add phrases including the {'word'}:</h3>
				{form.phrases.map((el, i) => {
					return <DualInput 
						key={`phrases-${i}`}
						id1={`phrases-origin-${i}`}
						value1={el.origin.value}
						label1={`Phrase ${i+1}*`}
						placeholder1={`Add a phrase...`}
						isTouched1={el.origin.isTouched}
						isValid1={el.origin.isValid}
						
						id2={`phrases-translation-${i}`}
						value2={el.translation.value}
						label2={`Translation for phrase ${i+1}*`}
						placeholder2={`Add translation.`}
						isTouched2={el.translation.isTouched}
						isValid2={el.translation.isValid}
						
						onDeleteDualInput={onDeleteDualInput}
						onChange={onChangeDualInput}
						onTouchHandler={onTouchHandlerDualInput}
						displayDeleteButton={true}
						inputErrorMessage={'It should contain between 1 and 200 characters.'}
					/>
				})}
				{
					form.phrases.length < 8 && (
						<Button type="button" onClick={onClickAddPhrase} size={'button-mid'} design={'green'}>
							<i className="fas fa-plus" /> Add a phrase
						</Button>
					)
				}				
			</div>
      <div className="main-form__input-container">
				<Input 
					id={'conjugationLink'}
					value={form.conjugationLink && form.conjugationLink.value}
					onChange={onChange}
					element={'input'} 
					type={'text'} 
					label={'Conjugation/Grammar link'} 
					placeholder={'Add a link to conjugation or grammar rule...'} 
					size={'input-full'} 
				/>
			</div>
      <div className="main-form__input-container">
				<Input 
					id={'personalNote'}
					value={form.personalNote && form.personalNote.value}
					onChange={onChange}
					label={'Note'} 
					placeholder={'Add a note about this word'} 
					size={'input-full'} 
					onTouchHandler={onTouchHandler}
          isTouched={form.personalNote && form.personalNote.isTouched}
          isValid={form.personalNote && form.personalNote.isValid}
          inputErrorMessage={'Note should contain at most 400 characters.'}
				/>
			</div>
      <div className="main-form__input-container">
        <Input
					id={'difficultyLevel'}
					value={form.difficultyLevel && form.difficultyLevel.value}
					onChange={onChange}
          element={'input'}
          type={'number'}
          label={'Difficulty level*'}
          placeholder={'(1 to 10)'}
          size={'input-full'}
          minValue="1"
					maxValue="10"
					onTouchHandler={onTouchHandler}
          isTouched={form.difficultyLevel && form.difficultyLevel.isTouched}
          isValid={form.difficultyLevel && form.difficultyLevel.isValid}
          inputErrorMessage={'Difficulty level should be between 1 and 10 (included)'}
        />
      </div>
			<TagsInput 
				id={'tags'}
				value={form.tags && form.tags.value}
				onChange={onChange}
				containerClassName={'main-form__input-container'} 
				placeholder={'color, verb, family...'}
				onTouchHandler={onTouchHandler}
				isTouched={form.tags && form.tags.isTouched}
				isValid={form.tags && form.tags.isValid}
				inputErrorMessage={'Each tag should have between 4 and 16 characters'}
			/>
			{
				loading ? (
					<Spinner />
				) : (
					<div className="main-form__button-container">
						<Button type={'button'} onClick={vocabularyToEdit ? onClickBackToWord : onClickBackCourse}>
							{vocabularyToEdit ? 'Back to Word' : 'Back to course'}
						</Button>
						<Button type={'submit'} design={'green'} >
							{vocabularyToEdit ? 'Edit' : 'Create'}
						</Button>
					</div>

				)
			}

			{
        formHasError && (
          <FormErrorMessage />
        )
      }

      { // backend error
        error && (
          <FormErrorMessage message={error} />
        )
      }
		</form>
	);
};

export default VocabularyForm;
