import React from 'react';

import Input from '../../shared/components/FormElements/Input';

import './DualInput.css';

const DualInput = props => {	
	const { 
		isAnswerElement,
		displayDeleteButton,
		onDeleteDualInput,
		onChange,
		onTouchHandler,
		inputErrorMessage,
		isCorrect,
		onChangeIsCorrect,
		id1,
		value1,
		label1,
		placeholder1,
		isTouched1,
		isValid1,
		id2,
		value2,
		label2,
		placeholder2,
		isTouched2,
		isValid2
	 } = props;

	return (
		<div className="quiz-answer-input">
			{displayDeleteButton && (
				<div className="delete-cross">
					<i className="fas fa-times" onClick={() => onDeleteDualInput(id1)}/>
				</div>
			)}

			<div className="quiz-answer-input-element">
				<Input
					id={id1}
					value={value1}
					onChange={onChange}
					element={'input'}
					type={'text'}
					label={label1}
					placeholder={placeholder1}
					size={'input-full'}
					onTouchHandler={onTouchHandler}
					isTouched={isTouched1}
					isValid={isValid1}
					inputErrorMessage={inputErrorMessage}
				/>
			</div>
			<div className="quiz-answer-input-element">
				<Input
					id={id2}
					value={value2}
					onChange={onChange}
					element={'input'}
					type={'text'}
					label={label2}
					placeholder={placeholder2}
					size={'input-full'}
					onTouchHandler={onTouchHandler}
					isTouched={isTouched2}
					isValid={isValid2}
					inputErrorMessage={inputErrorMessage}
				/>
			</div>
			{
				isAnswerElement && (
					<div className="quiz-answer-correct-container">
						<span className="quiz-answer-correct-title">This answer is correct:</span>
						<div 
							className={`quiz-answer-correct-pick ${isCorrect ? 'quiz-answer-correct-picked' : ''}`}
							onClick={() => onChangeIsCorrect(true, id1.split('-')[2])}
						>
							Yes
						</div>
						<div 
							className={`quiz-answer-correct-pick ${!isCorrect ? 'quiz-answer-correct-picked' : ''}`}
							onClick={() => onChangeIsCorrect(false, id1.split('-')[2])}
						>
							No
						</div>
					</div>
				)
			}
		</div>
	);
}

export default DualInput;
