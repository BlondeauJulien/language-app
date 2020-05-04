import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Flag from './Flag';
import CourseContext from '../../../context/course/courseContext';

import './CourseCard.css'

const CourseCard = props => {
  const courseContext = useContext(CourseContext);
  const history = useHistory();
  
  const { _id, name, countryFlag, language, learningFrom, creator } = props.course;
  const { selectCourse } = courseContext;

  const onSelectCourse = () => {
    if(!props.unClickable) {
      selectCourse(_id);
      history.push('/course');
    }
  }

  return (
    <div className="courseCard" onClick={onSelectCourse}>
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
