import React, { useContext, useEffect } from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import SearchForm from '../components/SearchForm';
import Spinner from '../../shared/SVGImages/Spinner';
import CourseContext from '../../context/course/courseContext';

import './Search.css'

const Search = () => {
  const courseContext = useContext(CourseContext);
  const { courses, loading, error, resetCourses, getCourses } = courseContext;
  
  useEffect(() => {
    return () => {
      resetCourses();
    }
  }, []);

  return (
    <MainPageContentContainer>
      <div className="search-form-container">
        <SearchForm getCourses={getCourses} />
      </div>
      {
        loading ? (
          <Spinner />
        ) : error ? (
          <p className="form-submit-error-message">
            {error}
          </p>
        ) : courses ? (
          <CardsContainer courses={courses}/>
        ) : null
      }
    </MainPageContentContainer>
  )
}

export default Search
