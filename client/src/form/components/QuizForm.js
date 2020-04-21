import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import QuizAnswerInput from './QuizAnswerInput';
import TagsInput from './TagsInput';

import './QuizForm.css';

const QuizForm = () => {
	return (
		<div>
			<form>
				<h2 className="main-form__title">Quiz</h2>
				<div className="main-form__input-container">
					<Input
						element={'input'}
						type={'text'}
						label={'image'}
            placeholder={"Add a web link to the image to describe."}
            size={'input-full'}
					/>
				</div>
				<div className="main-form__input-container">
					<Input
						element={'input'}
						type={'number'}
						label={'Difficulty level'}
            placeholder={'(1 to 10)'}
            size={'input-full'}
            minValue="1"
            maxValue="10"
					/>
				</div>
				<div className="main-form__input-container quiz-answer-input-container">
          <h3>Add Answers (at least one should be correct):</h3>
          <QuizAnswerInput />
          <QuizAnswerInput />
          <QuizAnswerInput />
          <Button type="button" ><i className="fas fa-plus"></i>{' '}Add an answer</Button>
        </div>
        <TagsInput 
          containerClassName={'main-form__input-container'} 
          placeholder={'color, verb, family...'}
        />
				<div className="main-form__button-container">
					<Button>Create</Button>
				</div>
			</form>
		</div>
	);
};

export default QuizForm;
