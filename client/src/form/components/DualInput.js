import React from 'react';

import Input from '../../shared/components/FormElements/Input';

import './DualInput.css';

const DualInput = props => {	
	return (
		<div className="quiz-answer-input">
			<div className="delete-cross">
				<i className="fas fa-times" />
			</div>
			<div className="quiz-answer-input-element">
				<Input
					element={'input'}
					type={'text'}
					label={props.label1}
					placeholder={props.placeholder1}
					size={'input-full'}
				/>
			</div>
			<div className="quiz-answer-input-element">
				<Input
					element={'input'}
					type={'text'}
					label={props.label2}
					placeholder={props.placeholder2}
					size={'input-full'}
				/>
			</div>
			{
				props.isAnswerElement && (
					<div className="quiz-answer-correct-container">
						<span className="quiz-answer-correct-title">This answer is correct:</span>
						<div className="quiz-answer-correct-pick quiz-answer-correct-picked">Yes</div>
						<div className="quiz-answer-correct-pick">No</div>
					</div>
				)
			}
		</div>
	);
}

export default DualInput;
