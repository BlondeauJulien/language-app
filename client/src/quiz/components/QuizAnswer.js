import React, { Fragment } from 'react';

import './QuizAnswer.css';

const QuizAnswer = props => {
  const { answer, onClickAnswer, isSelected, checkResult } = props;
  return (
    <div 
      className={`
        quiz-answer-item${' '} 
        ${isSelected && !checkResult ? 'answer-selected' : 'answer-unselected'}${' '}
        ${checkResult && answer.isCorrect ? 'answer-correct' : ''}${' '}
        ${isSelected && checkResult && !answer.isCorrect ? 'answer-uncorrect' : ''}${' '}
      `} 
      id={answer._id} 
      onClick={() => onClickAnswer(answer._id)}
    >
      <span>{answer.answer}</span>
      { checkResult && (
        <Fragment>
          <hr style={{'color': 'inherit'}}/>
          <span>{answer.translation}</span>
        </Fragment>
      )}
    </div>
  )
}

export default QuizAnswer
