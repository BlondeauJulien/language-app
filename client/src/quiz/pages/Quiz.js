import React, { useContext, Fragment } from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import BackNextContainer from '../../shared/components/UIElements/BackNextContainer';
import QuizHeader from '../components/QuizHeader';
import QuizImage from '../components/QuizImage';
import QuizAnswers from '../components/QuizAnswers';
import Button from '../../shared/components/FormElements/Button';
import UserContentActionsButtons from '../../shared/components/FormElements/UserContentActionsButtons';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';

import './Quiz.css';

const Quiz = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);

  const { currentCourse ,currentQuiz } = courseContext;
  const { user } = authContext;

  const onClickEdit = () => {

  }

  const onClickDelete = () => {

  }

  return (
    <MainPageContentContainer>
      {
        currentQuiz && (
          <Fragment>
            {
              user && currentCourse.creator._id === user.id && (
                <div className="vocab-creator-actions">
                  <UserContentActionsButtons 
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                  />
                </div>
              )
            }
            <BackNextContainer>
              <div className="quiz-main">
                <QuizHeader />
                <QuizImage quiz={currentQuiz}/>
                <QuizAnswers quiz={currentQuiz}/>
                <div className="quiz-button-container">
                  <Button type={'button'}>Check</Button>
                </div>
              </div>
            </BackNextContainer>
          </Fragment>
        )
      }
    </MainPageContentContainer>
  )
}

export default Quiz
