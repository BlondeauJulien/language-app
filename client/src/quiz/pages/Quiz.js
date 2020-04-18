import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import BackNextContainer from '../../shared/components/UIElements/BackNextContainer';
import QuizHeader from '../components/QuizHeader';
import QuizImage from '../components/QuizImage';
import QuizAnswers from '../components/QuizAnswers';
import Button from '../../shared/components/FormElements/Button';

import './Quiz.css';

const Quiz = () => {
  return (
    <MainPageContentContainer>
      <BackNextContainer>
        <div className="quiz-main">
          <QuizHeader />
          <QuizImage />
          <QuizAnswers />
          <div className="quiz-button-container">
            <Button type={'button'}>Check</Button>
          </div>
        </div>
      </BackNextContainer>
    </MainPageContentContainer>
  )
}

export default Quiz
