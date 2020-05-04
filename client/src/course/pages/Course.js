import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import Spinner from '../../shared/SVGImages/Spinner';
import CourseContext from '../../context/course/courseContext';

import './Course.css';

const Course = () => {
	const courseContext = useContext(CourseContext);
	const history = useHistory();

	const { currentCourse, selectCourse, loading, getCourseVocabulary, getCourseQuizzes } = courseContext;

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
    
	}, [ contentToDisplay, loading, currentCourse ]);

	return (
		<MainPageContentContainer>
      {
        currentCourse && (
          <div className="course-page-header">
          <CourseCard course={currentCourse} unClickable/>
          <CourseContentSearcForm contentToDisplay={contentToDisplay} setContentToDisplay={setContentToDisplay} />
          </div>
        )
      }
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
			{contentToDisplay === 'word' && currentCourse  && currentCourse.vocabulary && <CardsContainer words={currentCourse.vocabulary} /> }
			{contentToDisplay === 'quiz' && currentCourse  && currentCourse.quizzes && <CardsContainer quizzes={currentCourse.quizzes} />}
		</MainPageContentContainer>
	);
};

export default Course;
