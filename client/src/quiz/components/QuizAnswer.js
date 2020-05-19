import React from 'react';

import './QuizAnswer.css';

const QuizAnswer = props => {
  const { answer, onClickAnswer, isSelected } = props;
  return (
    <div 
      className={`quiz-answer-item ${isSelected ? 'answer-selected' : 'answer-unselected'}`} 
      id={answer._id} 
      onClick={() => onClickAnswer(answer._id)}
    >
      <span>{answer.answer}</span>
      <hr style={{'color': 'inherit'}}/>
      <span>{answer.translation}</span>
    </div>
  )
}

export default QuizAnswer
