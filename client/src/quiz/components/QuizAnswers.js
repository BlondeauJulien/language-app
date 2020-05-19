import React from 'react';

import QuizAnswer from './QuizAnswer';

import './QuizAnswers.css';

const QuizAnswers = props => {
  const { quiz, onClickAnswer, selectedAnswers, checkResult} = props;
  return (
    <div className="quiz-answers-container">
      {quiz.answers.map(answer => (
        <QuizAnswer 
          key={answer._id} 
          answer={answer} 
          onClickAnswer={onClickAnswer} 
          isSelected={selectedAnswers.some(a => a === answer._id)}
          checkResult={checkResult}
        />
      ))}
    </div>
  )
}

export default QuizAnswers
