import React from 'react';

import Flag from './Flag';

import './CourseCard.css'

const CourseCard = props => {
  const { name, countryFlag, language, learningFrom, creator } = props.course;
  return (
    <div className="courseCard">
      <h3>{name}</h3>
      <div className="courseCard__flag-container">
        <Flag countryCode={countryFlag} />
      </div>
      <div className="courseCard__info-container">
        <span>Learn:</span> 
        <span>{language}</span>
      </div>
      <div className="courseCard__info-container">
        <span>From:</span> 
        <span>{learningFrom}</span>
      </div>
      <div className="courseCard__creator">
        <span>by {creator.username}</span>
      </div>
    </div>
  )
}

export default CourseCard
