import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseForm from '../components/CourseForm';

import './MainForm.css';

const MainForm = () => {
  return (
    <MainPageContentContainer>
      <div className="main-form-container">
        <CourseForm />
      </div>
    </MainPageContentContainer>
  )
}

export default MainForm
