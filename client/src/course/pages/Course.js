import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import Spinner from '../../shared/SVGImages/Spinner';
import Button from '../../shared/components/FormElements/Button';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';

import './Course.css';

const Course = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);
	const history = useHistory();

  const { currentCourse, selectCourse, loading, getCourseVocabulary, getCourseQuizzes, deleteCourse, error, success } = courseContext;
  const { user, token } = authContext;

	const [ contentToDisplay, setContentToDisplay ] = useState('word');

	useEffect(() => {
		if (!currentCourse) {
			history.push('/');
    }

    return () => {
      selectCourse(null);
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
                user.id === currentCourse.creator._id && (
                  <div className="user-course-actions-btn">
                    <Button design={'green'} size={'button-mid'}><i className="fas fa-plus"></i> {contentToDisplay}</Button>
                    <Button design={'orange'} size={'button-mid'}><i className="fas fa-edit"></i></Button>
                    <Button 
                      design={'danger'} 
                      size={'button-mid'}
                      onClick={onClickDelete}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </div>
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
        <div className="success-action-container">
          <p>{success.message}</p>
          <Button to={'/'} design={'primary-txt-white-bg'}>Go back to home page</Button>
        </div>
      )}
		</MainPageContentContainer>
	);
};

export default Course;
