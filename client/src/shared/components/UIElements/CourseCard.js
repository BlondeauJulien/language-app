import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Flag from './Flag';
import CourseContext from '../../../context/course/courseContext';
import AuthContext from '../../../context/auth/authContext';

import './CourseCard.css'

const CourseCard = props => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  
  const { _id, name, countryFlag, language, learningFrom, creator } = props.course;
  const { selectCourse, courses } = courseContext;
  const { user } = authContext;

  const onSelectCourse = () => {
    if(!props.unClickable) {
      const regex = /profile/i;
      let course;
      if(regex.test(history.location.pathname)) {
        course = user.courses.find(course => course._id === _id);
      } else {
        course = courses.find(course => course._id === _id);
      }
      selectCourse(course);
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
