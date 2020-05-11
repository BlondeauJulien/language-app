import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';


import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import BackNextContainer from '../../shared/components/UIElements/BackNextContainer';
import QuizHeader from '../components/QuizHeader';
import QuizImage from '../components/QuizImage';
import QuizAnswers from '../components/QuizAnswers';
import Button from '../../shared/components/FormElements/Button';
import UserContentActionsButtons from '../../shared/components/FormElements/UserContentActionsButtons';
import Spinner from '../../shared/SVGImages/Spinner';
import SuccessMessage from '../../shared/components/UIElements/SuccessMessage';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';

import './Quiz.css';

const Quiz = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { 
    currentCourse, 
    currentQuiz, 
    deleteQuiz, 
    selectQuiz,
    setQuizToEdit,
    quizToEdit, 
    resetCourseSuccess, 
    error, 
    success, 
    loading,
    alwaysDisplayUnapprovedImage,
    setAlwaysShowUnapprovedImage
  } = courseContext;
  const { user, token } = authContext;
  const [ redirect, setRedirect ] = useState({
    toQuizForm: false,
    toCoursePage: false
  });

  useEffect(() => {
    if(redirect.toQuizForm) {
      history.push('/form/quiz');
    } else if (redirect.toCoursePage) {
      history.push('/course');
    }
    return () => {
      selectQuiz(null);
      resetCourseSuccess();
    }
  }, [ redirect ]);

  if(quizToEdit && !success) {
    !redirect.toQuizForm && setRedirect({...redirect, toQuizForm: true});
  }

  if(!currentQuiz && !success) {
    !redirect.toCoursePage && setRedirect({...redirect, toCoursePage: true});
  }

  const onClickEdit = () => setQuizToEdit(currentQuiz);

  const onClickDelete = () => deleteQuiz(currentQuiz._id,token);

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
                <QuizImage 
                  quiz={currentQuiz} 
                  alwaysDisplayUnapprovedImage={alwaysDisplayUnapprovedImage}
                  setAlwaysShowUnapprovedImage={setAlwaysShowUnapprovedImage}
                />
                <QuizAnswers quiz={currentQuiz}/>
                <div className="quiz-button-container">
                  <Button type={'button'}>Check</Button>
                </div>
              </div>
            </BackNextContainer>
          </Fragment>
        )
      }
      {error && <p className="form-submit-error-message">{error}</p>}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/course'} message={success.message} btnText={'Go back to course'}/>
      )}
    </MainPageContentContainer>
  )
}

export default Quiz
