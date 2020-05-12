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
    setSearchContent,
    searchVocabulary,
    searchQuiz, 
    error, 
    success } = courseContext;
  const { user, token } = authContext;

  const [ contentToDisplay, setContentToDisplay ] = useState('word');

	useEffect(() => {
		if (!currentCourse) {
			history.push('/');
    }

    return () => {
      let regex = /vocabulary|quiz|word/gi
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

  const filterWord = word => {
    let wordRegexp = new RegExp(searchVocabulary.word.trim(), 'i');
    let translationRegexp = new RegExp(searchVocabulary.translation.trim(), 'i');
    let difficultyLevelRegexp = new RegExp(searchVocabulary.difficultyLevel.trim(), 'i');
    let tagRegexp = new RegExp(searchVocabulary.tags.trim(), 'i');
    const tagsString = word.tags.join(' ');
    if(
      wordRegexp.test(word.word) &&
      translationRegexp.test(word.translation) &&
      tagRegexp.test(tagsString) &&
      difficultyLevelRegexp.test(word.difficultyLevel.toString())
    ) {
      return true
    }
    return false
  } 

  const filterQuiz = quiz => {
    let difficultyLevelRegexp = new RegExp(searchQuiz.difficultyLevel.trim(), 'i');
    let tagRegexp = new RegExp(searchQuiz.tags.trim(), 'i');
    const tagsString = quiz.tags.join(' ');
    if(
      tagRegexp.test(tagsString) &&
      difficultyLevelRegexp.test(quiz.difficultyLevel.toString())
    ) {
      return true
    }
    return false
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
            <CourseContentSearcForm contentToDisplay={contentToDisplay} setContentToDisplay={setContentToDisplay} setSearchContent={setSearchContent}/>
          </div>
        )
      }
      {error && <p className="form-submit-error-message">{error}</p>}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
			{contentToDisplay === 'word' && currentCourse  &&  currentCourse.vocabulary && <CardsContainer words={currentCourse.vocabulary.filter(filterWord)} /> }
			{contentToDisplay === 'quiz' && currentCourse  && currentCourse.quizzes && <CardsContainer quizzes={currentCourse.quizzes.filter(filterQuiz)} />}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/'} message={success.message} btnText={'Go back to home page'}/>
      )}
		</MainPageContentContainer>
	);
};

export default Course;
