import React from 'react';

import './QuizAnswer.css';

const QuizAnswer = props => {
  return (
    <div className="quiz-answer-item">
      <span>{props.answer.answer}</span>
    </div>
  )
}

export default QuizAnswer
