import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';

import './Course.css';

const Course = () => {
  const course = {
    name: 'Learn Norwegian colours',
    countryFlag: 'NO',
    language: 'Norwegian',
    learningFrom: 'French',
    creator: {
      username: 'julien'
    }
  }

  const words = [{
    word: 'This is a word',
    translation: 'This is the translation'
    }, {
    word: 'This is a word',
    translation: 'This is the translation'
    },{
    word: 'This is a word',
    translation: 'This is the translation'
    },{
    word: 'This is a word',
    translation: 'This is the translation'
    }, {
    word: 'This is a word',
    translation: 'This is the translation'
    },{
    word: 'This is a word',
    translation: 'This is the translation'
    }
  ]

  return (
    <MainPageContentContainer>
      <div className="course-page-header">
        <CourseCard course={course}/>
        <CourseContentSearcForm />
      </div>
      <CardsContainer words={words}/>
    </MainPageContentContainer>
  )
}

export default Course
