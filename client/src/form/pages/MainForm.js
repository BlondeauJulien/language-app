import React from 'react';
import { useParams } from "react-router-dom";

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseForm from '../components/CourseForm';
import QuizForm from '../components/QuizForm';
import VocabularyForm from '../components/VocabularyForm';

import './MainForm.css';

const MainForm = () => {
  let { formType } = useParams();

  return (
    <MainPageContentContainer>
      <div className="main-form-container">
        {formType === 'course' ? (
          <CourseForm />
        ) : formType === 'quiz' ? (
          <QuizForm />
        ) : formType === 'vocabulary' ? (
          <VocabularyForm />
        ) : null}
      </div>
    </MainPageContentContainer>
  )
}

export default MainForm
