import React from 'react';

import './QuizAnswer.css';

const QuizAnswer = props => {
  return (
    <div className="quiz-answer-item">
      <span>{props.text || 'This is the answer1'}</span>
    </div>
  )
}

export default QuizAnswer
