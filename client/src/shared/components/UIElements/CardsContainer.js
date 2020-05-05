import React from 'react';

import CourseCard from './CourseCard';
import VocabularyCard from '../../../course/components/VocabularyCard';
import QuizCard from '../../../course/components/QuizCard';

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
        : props.quizzes ?
        props.quizzes.map(quiz => {
          return (<QuizCard quiz={quiz}/>)
        })
        :
        (<p>An error occured or there is nothing to display</p>)
      }
      {
        (props.courses && props.courses.length === 0) || 
        (props.words && props.words.length === 0) ||
        (props.quizzes && props.quizzes.length === 0) ? 
        (<p className="empty-result-message">Nothing to display / no result</p>) : null
      }
    </div>
  )
}

export default CardsContainer
