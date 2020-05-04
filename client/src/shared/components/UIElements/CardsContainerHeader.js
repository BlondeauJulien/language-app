import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../FormElements/Button';
import CourseContext from '../../../context/course/courseContext';

import './CardsContainerHeader.css'

const CardsContainerHeader = props => {
  const courseContext = useContext(CourseContext);
  const history = useHistory();

  const { getCourses } = courseContext;

  const onClick = () => {
    getCourses();
    history.push('/search')
  }

  return (
    <div className="cards-container-header">
      <h3>{props.title}</h3>
      <Button type={'button'} design={"plain-text"} onClick={onClick}>SEE ALL COURSES</Button>
    </div>
  )
}

export default CardsContainerHeader
