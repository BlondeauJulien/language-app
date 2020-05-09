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
import validate from '../../shared/util/inputValidation';

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

	const formInitialState = {
		word: { value: '', isValid: false, isTouched: false },
		translation: [{ value: '', isValid: false, isTouched: false }],
		phrases: [],
		conjugationLink: { value: '', isValid: true, isTouched: false },
		personalNote: { value: '', isValid: true, isTouched: false },
		difficultyLevel: { value: '', isValid: false, isTouched: false },
		tags: { value: '', isValid: true, isTouched: false }
	}

	const [ formHasError, setFormHasError ] = useState(false);
	const [ form, setForm ] = useState(formInitialState);
	
	useEffect(() => {
    if(currentVocabulary) {
      resetCourseSuccess();
      history.push('/word');
		}
		return () => {
			setWordToEdit(null);
		}
	}, [ success, currentVocabulary ]);
	
	useEffect(() => {
		if(vocabularyToEdit) {
			setForm({
				...form,
				word: {...form.word, value: vocabularyToEdit.word, isValid: true},
				translation: [...vocabularyToEdit.translation].map(t => {
					return { value: t, isValid: true, isTouched: false}
				}),
				phrases: [...vocabularyToEdit.phrases].map(p => {
					return {
						origin: { value: p.origin, isValid: true, isTouched: false},
						translation: { value: p.translation, isValid: true, isTouched: false}
					}
				}),
				conjugationLink: {...form.conjugationLink, value: vocabularyToEdit.conjugationLink || '', isValid: true},
				personalNote: {...form.personalNote, value: vocabularyToEdit.personalNote || '', isValid: true},
				difficultyLevel: {...form.difficultyLevel, value: vocabularyToEdit.difficultyLevel, isValid: true},
				tags: {...form.tags, value: vocabularyToEdit.tags.join(', '), isValid: true},
			});
		}
	}, [ vocabularyToEdit ])

	const onClickBackCourse = () => {
		history.push('/course');
	}

	const onClickBackToWord = () => {
		selectVocabulary(vocabularyToEdit);
	}

	const resetErrors = () => {
		setFormHasError(false);
    if(error) {
      setCourseError(false);
    }
	} 

	const onChange = e => {
    const id = e.target.id;
    const value = e.target.value;

		resetErrors();

		setForm({...form, [id]: {...form[id], value: value, isValid: validate(value, id)}});
	}

	const onChangeInputForMulti = e => {
    const id = e.target.id.split('-')[0];
		const position = e.target.id.split('-')[1];
		const value = e.target.value;

		resetErrors();

		setForm({...form, [id]: [...form[id].map((el, i) => {
			if(i.toString() === position) {
				el.value = value;
				el.isValid = validate(value, id);
			}
			return el;
		})]});
	}

	const onDeleteInputForMulti = element => {
		const id = element.split('-')[0];
		const position = element.split('-')[1];

		setForm({...form, [id]: [...form[id].filter((el, i) => {
			return i.toString() !== position;
		})]});
	}

	const onClickAddTranslation = () => {
		if(form.translation.length >= 8 ) return;
		const id = 'translation';
    const value = { value: '', isValid: false, isTouched: false };
		setForm({...form, [id]: [...form[id], value]});
	}
	
	const onTouchHandler = e => {
		setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});
	}
	
	const onTouchHandlerInputForMulti = e => {
		const id = e.target.id.split('-')[0];
		const position = e.target.id.split('-')[1];

		setForm({...form, [id]: [...form[id].map((el, i) => {
			if(i.toString() === position) {
				el.isTouched = true;
			}
			return el;
		})]});
	}

	const onChangeDualInput = e => {
    const id = e.target.id.split('-')[0];
    const idEl = e.target.id.split('-')[1];
		const position = e.target.id.split('-')[2];
		const value = e.target.value;

		resetErrors();

		setForm({...form, [id]: [...form[id].map((el, i) => {
			if(i.toString() === position) {
				el[idEl].value = value;
				el[idEl].isValid = validate(value, id + idEl);
			}
			return el;
		})]});
	}

	const onTouchHandlerDualInput = e => {
    const id = e.target.id.split('-')[0];
    const idEl = e.target.id.split('-')[1];
		const position = e.target.id.split('-')[2];

		setForm({...form, [id]: [...form[id].map((el, i) => {
			if(i.toString() === position) {
				el[idEl].isTouched = true;
			}
			return el;
		})]});
	}

	const onClickAddPhrase = () => {
		if(form.phrases.length >= 8 ) return;

		const id = 'phrases';
		const base = { value: '', isValid: false, isTouched: false }
    const value = {origin: { ...base}, translation: {...base}};
		setForm({...form, [id]: [...form[id], value]});
	}

	const onDeleteDualInput = element => {
		const id = element.split('-')[0];
		const position = element.split('-')[2];

		setForm({...form, [id]: [...form[id].filter((el, i) => {
			return i.toString() !== position;
		})]});
	}

	const onSubmit = e => {
		e.preventDefault();
		for(const input in form) {
			if(input === "translation") {
				let hasError = form[input].find(el => !el.isValid);
				if(hasError) {
					setFormHasError(true);
					return;
				}
			} else if (input === "phrases"){
				let hasError = form[input].find(el => !el.origin.isValid || !el.translation.isValid);
				if(hasError) {
					setFormHasError(true);
					return;
				}
			} else {
				if(!form[input].isValid) {
					setFormHasError(true);
					return;
				}
			}
    }

     const formToSend = {
			word: form.word.value,
			translation: form.translation.map(t => t.value),
			difficultyLevel: form.difficultyLevel.value,
			course: currentCourse._id
		} 
		if(form.phrases.length) {
			formToSend.phrases = form.phrases.map(p => {
				return {origin: p.origin.value, translation: p.translation.value};
			})
		}
		if(form.conjugationLink.value) formToSend.conjugationLink = form.conjugationLink.value;
		if(form.personalNote.value) formToSend.personalNote = form.personalNote.value;
		if(form.tags.value) {
			formToSend.tags = form.tags.value.split(',').map(t => {
				return t.trim();
			})
		}
		console.log(form)
	/* 	{
			vocabularyToEdit ? 
			editVocabulary( vocabularyToEdit._id ,formToSend, token) : 
			createVocabulary(formToSend, token)
		} */
		
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

export default VocabularyForm;
