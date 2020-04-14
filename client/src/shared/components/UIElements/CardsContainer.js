import React from 'react';

import CourseCard from './CourseCard';
import VocabularyCard from '../../../course/components/VocabularyCard';

import './CardsContainer.css';

const CardsContainer = props => {

  return (
    <div className="cards-container">
      {props.courses ? 
        props.courses.map(course => {
          return (<CourseCard course={course}/>)
        }) 
        : props.words ?
        props.words.map(word => {
          return (<VocabularyCard word={word}/>)
        })
        :
        (<p>default</p>)
      }
    </div>
  )
}

export default CardsContainer
