import React from 'react';

import QuizAnswer from './QuizAnswer';

import './QuizAnswers.css';

const QuizAnswers = () => {
  return (
    <div className="quiz-answers-container">
      <QuizAnswer text={'hello this is a very long answer and I dont really know why this is long'}/>
      <QuizAnswer />
      <QuizAnswer />
      <QuizAnswer />
      <QuizAnswer />
      <QuizAnswer />
      <QuizAnswer />
    </div>
  )
}

export default QuizAnswers
