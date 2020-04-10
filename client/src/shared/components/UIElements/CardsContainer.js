import React from 'react';

import CourseCard from './CourseCard';

import './CardsContainer.css';

const CardsContainer = props => {
  return (
    <div className="cards-container">
      {props.courses.map(course => {
        return (<CourseCard course={course}/>)
      })}
    </div>
  )
}

export default CardsContainer
