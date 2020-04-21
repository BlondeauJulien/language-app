import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseForm from '../components/CourseForm';
import QuizForm from '../components/QuizForm';

import './MainForm.css';

const MainForm = () => {
  return (
    <MainPageContentContainer>
      <div className="main-form-container">
        {/* <CourseForm /> */}
        <QuizForm />
      </div>
    </MainPageContentContainer>
  )
}

export default MainForm
