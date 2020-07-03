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
import FormErrorMessage from '../../shared/components/FormElements/FormErrorMessage';
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
    setAlwaysShowUnapprovedImage,
    clearSearchContent
  } = courseContext;
  const { user, token } = authContext;
  const [ selectedAnswers, setSelectedAnswers ] = useState([]);
  const [ checkResult, setCheckResult ] = useState(false);
  const [ displaySelectionEmptyMessage, setDisplaySelectionEmptyMessage ] = useState(false);
  const [ redirect, setRedirect ] = useState({
    toQuizForm: false,
    toCoursePage: false
  });

  useEffect(() => {
    return () => {
      const regex = /course|quiz|word/gi;
      const isMatch = regex.test(history.location.pathname);
      if(!isMatch || /form/gi.test(history.location.pathname)) {
        clearSearchContent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ redirect ]);

  if(quizToEdit && !success) {
    !redirect.toQuizForm && setRedirect({...redirect, toQuizForm: true});
  }

  if(!currentQuiz && !success) {
    !redirect.toCoursePage && setRedirect({...redirect, toCoursePage: true});
  }

  const resetStates = () => {
    setCheckResult(false);
    setDisplaySelectionEmptyMessage(false);
    setSelectedAnswers([]);
  }

  const onClickEdit = () => setQuizToEdit(currentQuiz);

  const onClickDelete = () => deleteQuiz(currentQuiz._id,token);

  const onClickNextQuiz = () => {
    resetStates();
    const quizzesArr = currentCourse.quizzes;
    const quizIndex = quizzesArr.findIndex(quiz => quiz._id === currentQuiz._id);
    let nextQuiz = quizzesArr[quizIndex + 1] ? quizzesArr[quizIndex + 1] : quizzesArr[0];
    selectQuiz(nextQuiz)
  }

  const onClickPrevousQuiz = () => {
    resetStates();
    const quizzesArr = currentCourse.quizzes;
    const quizIndex = quizzesArr.findIndex(quiz => quiz._id === currentQuiz._id);
    let previousQuiz = quizzesArr[quizIndex - 1] ? quizzesArr[quizIndex - 1] : quizzesArr[quizzesArr.length - 1];
    selectQuiz(previousQuiz)
  }

  const onClickAnswer = answerId => {
    setDisplaySelectionEmptyMessage(false);
    const answerIndex = selectedAnswers.findIndex(answer => answer === answerId);
    if(answerIndex >= 0) {
      let newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers.splice(answerIndex, 1);
      setSelectedAnswers(newSelectedAnswers);
    } else {
      setSelectedAnswers([...selectedAnswers, answerId]);
    }
  }

  const onClickCheckResult = () => {
    if(!selectedAnswers.length) {
      setDisplaySelectionEmptyMessage(true);
    } else {
      setCheckResult(true);
    }
  }

  return (
    <MainPageContentContainer>
      {
        currentQuiz && (
          <Fragment>
            <div className="back-previous" onClick={() => setRedirect({...redirect, toCoursePage: true})}>
              <i className="fas fa-arrow-alt-circle-left"></i>
            </div>
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
            <BackNextContainer 
              onClickNext={onClickNextQuiz} 
              onClickPrevious={onClickPrevousQuiz}
              childElementName={"quiz"}
            >
              <div className="quiz-main">
                <QuizHeader isUserWord={user && currentCourse.creator._id === user.id}/>
                <QuizImage 
                  quiz={currentQuiz} 
                  alwaysDisplayUnapprovedImage={alwaysDisplayUnapprovedImage}
                  setAlwaysShowUnapprovedImage={setAlwaysShowUnapprovedImage}
                />
                <QuizAnswers 
                  quiz={currentQuiz} 
                  onClickAnswer={onClickAnswer} 
                  selectedAnswers={selectedAnswers}
                  checkResult={checkResult}
                />
                {
                  !checkResult && (
                    <div className="quiz-button-container">
                      <Button type={'button'} onClick={onClickCheckResult}>Check</Button>
                    </div>
                  )
                }
              </div>
            </BackNextContainer>
          </Fragment>
        )
      }
      {error && <FormErrorMessage message={error} />}            
      {displaySelectionEmptyMessage && <FormErrorMessage message={'Select at least one answer'} />}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/course'} message={success.message} btnText={'Go back to course'}/>
      )}
    </MainPageContentContainer>
  )
}

export default Quiz
