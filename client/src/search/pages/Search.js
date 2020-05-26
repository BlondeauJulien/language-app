import React, { useContext, useEffect, useState } from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import SearchForm from '../components/SearchForm';
import Spinner from '../../shared/SVGImages/Spinner';
import CourseContext from '../../context/course/courseContext';

import './Search.css'

const Search = () => {
  const courseContext = useContext(CourseContext);
  const { courses, loading, error, resetCourses, getCourses } = courseContext;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  useEffect(() => {
    return () => {
      resetCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

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
          <CardsContainer 
            courses={courses}
            paginate={paginate}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            totalItems={courses.length}
          />
        ) : null
      }
    </MainPageContentContainer>
  )
}

export default Search
