import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import DualInput from './DualInput';
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
					<DualInput 
						isAnswerElement 
						label1={'Answer 1'} 
						placeholder1={'Add a phrase that describe (or not!) the image.'}
						label2={'Translation for answer 1'}
						placeholder2={'Add translation.'}
					/>
					<DualInput 
						isAnswerElement 
						label1={'Answer 2'} 
						placeholder1={'Add a phrase that describe (or not!) the image.'}
						label2={'Translation for answer 2'}
						placeholder2={'Add translation.'}
					/>					
					<DualInput 
						isAnswerElement 
						label1={'Answer 3'} 
						placeholder1={'Add a phrase that describe (or not!) the image.'}
						label2={'Translation for answer 3'}
						placeholder2={'Add translation.'}
					/>
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
