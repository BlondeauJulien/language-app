import React from 'react';

import './QuizImage.css';

const QuizImage = props => {
  return (
    <div className="quiz-image-container">
      <img src={props.quiz.image} alt="quiz image" />
    </div>
  )
}

export default QuizImage
