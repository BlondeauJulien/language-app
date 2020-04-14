import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import QuizSearch from './QuizSearch';
import CourseSearch from './CourseSearch';
import VocabularySearch from './VocabularySearch';

import './SearchForm.css'

const searchForm = () => {
  return (
    <form>
      <h3 className="search-title">Form title</h3>
      <div className="search-inputs-container">
        {/* <QuizSearch /> */}
        {/* <CourseSearch /> */}
        <VocabularySearch />
      </div>
      <div className="search-submit-container">
        <Button type={'submit'}>Search</Button>
      </div>
    </form>
  )
}

export default searchForm
