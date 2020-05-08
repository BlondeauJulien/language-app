import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import Spinner from '../../shared/SVGImages/Spinner';
import UserContentActionsButtons from '../../shared/components/FormElements/UserContentActionsButtons';
import SuccessMessage from '../../shared/components/UIElements/SuccessMessage';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';

import './Course.css';

const Course = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);
	const history = useHistory();

  const { 
    currentCourse, 
    selectCourse, 
    loading, 
    getCourseVocabulary, 
    getCourseQuizzes,
    setCourseToEdit, 
    deleteCourse, 
    error, 
    success } = courseContext;
  const { user, token } = authContext;

  const [ contentToDisplay, setContentToDisplay ] = useState('word');

	useEffect(() => {
		if (!currentCourse) {
			history.push('/');
    }

    return () => {
      let regex = /vocabulary|quiz/gi
      if(!regex.test(history.location.pathname)) {
        selectCourse(null);
      }
    }
	}, []);

  useEffect(() => {
    if(currentCourse) {
      if (!currentCourse.vocabulary && contentToDisplay === 'word') {
        getCourseVocabulary(currentCourse._id);
      }
  
      if (!currentCourse.quizzes && contentToDisplay === 'quiz') {
        getCourseQuizzes(currentCourse._id);
      }
    }
    
  }, [ contentToDisplay, currentCourse ]);

  const onCLickCreateContent = () => {
    if(contentToDisplay === 'word') {
      history.push('/form/vocabulary');
    } else {
      history.push('/form/quiz');
    }
  }

  const onClickEdit = () => {
    setCourseToEdit(currentCourse);
		history.push('/form/course');
  }
  
  const onClickDelete = () => {
    deleteCourse(currentCourse._id, token);
  }

	return (
		<MainPageContentContainer>
      {
        currentCourse && (
          <div className="course-page-header">
            <div>
              <CourseCard course={currentCourse} unClickable/>
              { 
                user && user.id === currentCourse.creator._id && (
                  
                  <UserContentActionsButtons 
                    textToDisplayOnCreateBtn={contentToDisplay}
                    onCLickCreateContent={onCLickCreateContent}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                  />                  
                )
              }
            </div>
            <CourseContentSearcForm contentToDisplay={contentToDisplay} setContentToDisplay={setContentToDisplay} />
          </div>
        )
      }
      {error && <p className="form-submit-error-message">{error}</p>}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
			{contentToDisplay === 'word' && currentCourse  && currentCourse.vocabulary && <CardsContainer words={currentCourse.vocabulary} /> }
			{contentToDisplay === 'quiz' && currentCourse  && currentCourse.quizzes && <CardsContainer quizzes={currentCourse.quizzes} />}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/'} message={success.message} btnText={'Go back to home page'}/>
      )}
		</MainPageContentContainer>
	);
};

export default Course;
