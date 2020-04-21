import React from 'react';

import Input from '../../shared/components/FormElements/Input';

import './QuizAnswerInput.css';

function QuizAnswerInput() {
	return (
		<div className="quiz-answer-input">
			<div className="delete-cross">
				<i className="fas fa-times" />
			</div>
			<div className="quiz-answer-input-element">
				<Input
					element={'input'}
					type={'text'}
					label={'Answer 1'}
					placeholder={'Add a phrase that describe (or not!) the image.'}
					size={'input-full'}
				/>
			</div>
			<div className="quiz-answer-input-element">
				<Input
					element={'input'}
					type={'text'}
					label={'Translation for answer 1'}
					placeholder={'Add translation.'}
					size={'input-full'}
				/>
			</div>
			<div className="quiz-answer-correct-container">
				<span className="quiz-answer-correct-title">This answer is correct:</span>
				<div className="quiz-answer-correct-pick quiz-answer-correct-picked">Yes</div>
				<div className="quiz-answer-correct-pick">No</div>
			</div>
		</div>
	);
}

export default QuizAnswerInput;
