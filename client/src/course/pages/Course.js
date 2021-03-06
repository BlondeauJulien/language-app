import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import Spinner from '../../shared/SVGImages/Spinner';
import UserContentActionsButtons from '../../shared/components/FormElements/UserContentActionsButtons';
import SuccessMessage from '../../shared/components/UIElements/SuccessMessage';
import FormErrorMessage from '../../shared/components/FormElements/FormErrorMessage';
import { filterWordMethod, filterQuizMethod } from '../util/filterMethods';
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
    searchVocabulary,
    searchQuiz, 
    clearSearchContent,
    error, 
    success } = courseContext;
  const { user, token } = authContext;

  const [ contentToDisplay, setContentToDisplay ] = useState('word');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

	useEffect(() => {
		if (!currentCourse) {
			history.push('/');
    }

    return () => {
      const regex = /vocabulary|quiz|word/gi;
      const isMatch = regex.test(history.location.pathname);
      if(!isMatch) {
        selectCourse(null);
      }
      if(!isMatch || /form/gi.test(history.location.pathname)) {
        clearSearchContent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  useEffect(() => {
    setCurrentPage(1);

    if(currentCourse) {
      if (!currentCourse.vocabulary && contentToDisplay === 'word') {
        getCourseVocabulary(currentCourse._id);
      }
  
      if (!currentCourse.quizzes && contentToDisplay === 'quiz') {
        getCourseQuizzes(currentCourse._id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ contentToDisplay, currentCourse ]);

  const onClickCreateContent = () => {
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

  const filterWord = word => filterWordMethod(word, searchVocabulary);

  const filterQuiz = quiz => filterQuizMethod(quiz, searchQuiz);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

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
                    onClickCreateContent={onClickCreateContent}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                  />                  
                )
              }
            </div>
            <CourseContentSearcForm contentToDisplay={contentToDisplay} setContentToDisplay={setContentToDisplay} setCurrentPage={setCurrentPage}/>
          </div>
        )
      }
      {error && <FormErrorMessage message={error} />}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
			{contentToDisplay === 'word' && currentCourse  &&  currentCourse.vocabulary && (
        <CardsContainer 
          words={currentCourse.vocabulary.filter(filterWord)} 
          paginate={paginate}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          totalItems={currentCourse.vocabulary.filter(filterWord).length}
        />
      )}
			{contentToDisplay === 'quiz' && currentCourse && currentCourse.quizzes && (
        <CardsContainer 
          quizzes={currentCourse.quizzes.filter(filterQuiz)} 
          paginate={paginate}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          totalItems={currentCourse.quizzes.filter(filterQuiz).length}
        />
      )}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/'} message={success.message} btnText={'Go back to home page'}/>
      )}
		</MainPageContentContainer>
	);
};

export default Course;
