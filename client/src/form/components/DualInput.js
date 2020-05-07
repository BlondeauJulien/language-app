import React from 'react';

import Input from '../../shared/components/FormElements/Input';

import './DualInput.css';

const DualInput = props => {	
	return (
		<div className="quiz-answer-input">
			{props.displayDeleteButton && (
				<div className="delete-cross">
					<i className="fas fa-times" onClick={() => props.onDeleteDualInput(props.id1)}/>
				</div>
			)}

			<div className="quiz-answer-input-element">
				<Input
					id={props.id1}
					value={props.value1}
					onChange={props.onChange}
					element={'input'}
					type={'text'}
					label={props.label1}
					placeholder={props.placeholder1}
					size={'input-full'}
					onTouchHandler={props.onTouchHandler}
					isTouched={props.isTouched1}
					isValid={props.isValid1}
					inputErrorMessage={props.inputErrorMessage}
				/>
			</div>
			<div className="quiz-answer-input-element">
				<Input
					id={props.id2}
					value={props.value2}
					onChange={props.onChange}
					element={'input'}
					type={'text'}
					label={props.label2}
					placeholder={props.placeholder2}
					size={'input-full'}
					onTouchHandler={props.onTouchHandler}
					isTouched={props.isTouched2}
					isValid={props.isValid2}
					inputErrorMessage={props.inputErrorMessage}
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
