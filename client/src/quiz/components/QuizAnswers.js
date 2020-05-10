import React from 'react';

import QuizAnswer from './QuizAnswer';

import './QuizAnswers.css';

const QuizAnswers = props => {
  return (
    <div className="quiz-answers-container">
      {props.quiz.answers.map((answer,i) => (
        <QuizAnswer key={`answer-${i}`} answer={answer}/>
      ))}
    </div>
  )
}

export default QuizAnswers
