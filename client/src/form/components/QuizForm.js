import React, { useContext, useState, useEffect, Fragment} from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import DualInput from './DualInput';
import TagsInput from './TagsInput';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../../shared/SVGImages/Spinner';
import validate from '../../shared/util/inputValidation';

import './QuizForm.css';

const QuizForm = () => {
	const courseContext = useContext(CourseContext);
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const { 
		currentCourse,
		currentQuiz,
		error,
		success,
		setCourseError,
		createQuiz,
		loading,
		resetCourseSuccess
	} = courseContext;
	const { token } = authContext;

	const formInitialState = {
		image: { value: '', isValid: false, isTouched: false },
		answers: [{
			answer: { value: '', isValid: false, isTouched: false },
			translation: { value: '', isValid: false, isTouched: false },
			isCorrect: false
		},
		{
			answer: { value: '', isValid: false, isTouched: false },
			translation: { value: '', isValid: false, isTouched: false },
			isCorrect: false
		}],
		difficultyLevel: { value: '', isValid: false, isTouched: false },
		tags: { value: '', isValid: true, isTouched: false }
	}

	const [ formHasError, setFormHasError ] = useState(false);
	const [ form, setForm ] = useState(formInitialState);

	useEffect(() => {
    if(currentQuiz) {
      resetCourseSuccess();
      history.push('/quiz');
		}
/* 		return () => {
			setWordToEdit(null);
		} */
	}, [ success, currentQuiz ]);

	const onClickBackCourse = () => {
		history.push('/course');
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

	const onTouchHandler = e => {
		setForm({...form, [e.target.id]: {...form[e.target.id], isTouched: true}});
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

	const onChangeIsCorrect = (value, position) => {
		const id = 'answers';
		setForm({...form, [id]: [...form[id].map((el, i) => {
			if(i.toString() === position) {
				el.isCorrect = value;
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

	const onClickAddAnswer = () => {
		if(form.answers.length >= 8 ) return;

		const id = 'answers';
		const base = { value: '', isValid: false, isTouched: false }
    const value = {answer: { ...base}, translation: {...base}, isCorrect: false};
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
			if (input === "answers"){
				let hasError = form[input].find(el => !el.answer.isValid || !el.translation.isValid);
				let hasOneCorrect = form[input].find(el => el.isCorrect);
				if(hasError || !hasOneCorrect) {
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
			image: form.image.value,
			difficultyLevel: form.difficultyLevel.value,
			answers: form.answers.map(a => {
				return {answer: a.answer.value, translation: a.translation.value, isCorrect: a.isCorrect};
			}),
			course: currentCourse._id
		} 

		if(form.tags.value) {
			formToSend.tags = form.tags.value.split(',').map(t => {
				return t.trim();
			})
		}

		console.log(formToSend);
		createQuiz(formToSend, token)
/* 		{
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
		<div>
			<form onSubmit={onSubmit}>
				<h2 className="main-form__title">Quiz</h2>
				<div className="main-form__input-container">
					<Input
						id={'image'}
						value={form.image && form.image.value}
						onChange={onChange}
						element={'input'}
						type={'text'}
						label={'image (link only)*'}
            placeholder={"Add a web link of the image to describe."}
						size={'input-full'}
						onTouchHandler={onTouchHandler}
						isTouched={form.image && form.image.isTouched}
						isValid={form.image && form.image.isValid}
						inputErrorMessage={'You need to add an valid image link'}
					/>
				</div>
				{
					form.image.value && validate(form.image.value, 'image') && (
						<div className='image-preview'>
							<h3>Image preview:</h3>
							<img src={form.image.value} />
						</div>
					)
				}
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
				<div className="main-form__input-container quiz-answer-input-container">
          <h3>Add Answers (at least one should be correct):</h3>
					{form.answers.map((el, i) => {
					return <DualInput 
						key={`answers-${i}`}
						id1={`answers-answer-${i}`}
						value1={el.answer.value}
						label1={`Answer ${i+1}*`}
						placeholder1={`Add a phrase that describe (or not!) the image.`}
						isTouched1={el.answer.isTouched}
						isValid1={el.answer.isValid}
						
						id2={`answers-translation-${i}`}
						value2={el.translation.value}
						label2={`Translation for answer ${i+1}*`}
						placeholder2={`Add translation.`}
						isTouched2={el.translation.isTouched}
						isValid2={el.translation.isValid}
						
						isAnswerElement
						isCorrect={el.isCorrect}
						onChangeIsCorrect={onChangeIsCorrect}
						onDeleteDualInput={onDeleteDualInput}
						onChange={onChangeDualInput}
						onTouchHandler={onTouchHandlerDualInput}
						displayDeleteButton={form.answers.length > 1}
						inputErrorMessage={'It should contain between 2 and 200 characters.'}
					/>
				})}
				{
					form.answers.length < 8 && (
						<Button type="button" onClick={onClickAddAnswer} size={'button-mid'} design={'green'}>
							<i className="fas fa-plus" />{' '}Add an answer
						</Button>
					)
				}
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
							<Button type={'button'} onClick={onClickBackCourse}>
								Back to course
							</Button>
							<Button type={'submit'} design={'green'} >
								Create
							</Button>
						</div>

					)
				}
				{
					formHasError && (
						<Fragment>
						<p className="form-submit-error-message">
							Please fill the form properly before submitting
						</p>
						{
							!form.answers.find(el => el.isCorrect) && (
								<p className="form-submit-error-message">
									At least on answer should be correct
								</p>
							)
						}
						</Fragment>
					)
				}
			</form>
		</div>
	);
};

export default QuizForm;
