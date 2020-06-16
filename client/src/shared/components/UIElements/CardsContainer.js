import React, { Fragment, useState, useEffect } from 'react';

import CourseCard from './CourseCard';
import VocabularyCard from '../../../course/components/VocabularyCard';
import QuizCard from '../../../course/components/QuizCard';
import FormErrorMessage from '../FormElements/FormErrorMessage';
import Pagination from './Pagination';

import './CardsContainer.css';

const CardsContainer = props => {
  const { totalItems, postsPerPage, currentPage, paginate } = props;
  const [ indexOfLastItem, setIndexLastItem ] = useState(currentPage * postsPerPage);
  const [ indexOfFirstItem, setIndexOfFirstItem ] = useState(indexOfLastItem - postsPerPage);

  useEffect(() => {
    let indexLastItem = currentPage * postsPerPage;
    let indexFirstItem = indexLastItem - postsPerPage
    setIndexLastItem(indexLastItem);
    setIndexOfFirstItem(indexFirstItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentPage ]);

  return (
    <Fragment>
      <div className="cards-container">
        {props.courses ? 
          props.courses.slice(indexOfFirstItem, indexOfLastItem).map(course => {
            return (<CourseCard key={course._id} course={course}/>)
          }) 
          : props.words ?
          props.words.slice(indexOfFirstItem, indexOfLastItem).map(word => {
            return (<VocabularyCard key={word._id} word={word}/>)
          })
          : props.quizzes ?
          props.quizzes.slice(indexOfFirstItem, indexOfLastItem).map(quiz => {
            return (<QuizCard key={quiz._id} quiz={quiz}/>)
          })
          :
          (<FormErrorMessage message={'An error occured or there is nothing to display'}/>)
        }

        {
          (props.courses && props.courses.length === 0) || 
          (props.words && props.words.length === 0) ||
          (props.quizzes && props.quizzes.length === 0) ? 
          (<p className="empty-result-message">Nothing to display / no result</p>) : null
        }
      </div>
      {totalItems > 0 && totalItems > postsPerPage && (<Pagination
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        paginate={paginate}
      />)}
    </Fragment>
  )
}

export default CardsContainer
