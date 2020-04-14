import React from 'react';

import './CourseContentSearchForm.css';
import Button from '../../shared/components/FormElements/Button';
import QuizSearch from './QuizSearch';
import VocabularySearch from './VocabularySearch';

const CourseContentSearchForm = () => {
  return (
    <form className="form-search-course-content">
      <div className="search-coourse-content-header">
        <span className="button-course-unselected">
          <Button type={'button'} design={'plain-text'}>Words</Button>
        </span>
        <span className="separator"></span>
        <span>
          <Button type={'button'} design={'plain-text'}>Quizzes</Button>
        </span>
      </div>
      <div className="search-course-content-inputs-container">
        <QuizSearch />
        {/* <VocabularySearch /> */}
      </div>
      <div className="search-submit-container">
        <Button type={'submit'}>Search</Button>
      </div>
    </form>
  )
}

export default CourseContentSearchForm
