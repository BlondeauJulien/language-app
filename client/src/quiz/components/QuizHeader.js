import React from 'react';

import './QuizHeader.css';

const QuizHeader = props => {
  return (
    <div className={`quiz-header ${props.isUserWord ? 'quiz-header-margin-top' : ''}`}>
      <h2>Image quiz</h2>
      <span>Pick all the phrases that describe this image</span>
    </div>
  )
}

export default QuizHeader
