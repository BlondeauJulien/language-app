import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';

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

  return (
    <MainPageContentContainer>
      <div className="course-page-header">
        <CourseCard course={course}/>
        <CourseContentSearcForm />
      </div>
    </MainPageContentContainer>
  )
}

export default Course
