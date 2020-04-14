import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import CourseSearch from './CourseSearch';

import './SearchForm.css'

const searchForm = () => {
  return (
    <form>
      <h3 className="search-title">Search a course</h3>
      <div className="search-inputs-container">
        <CourseSearch />
      </div>
      <div className="search-submit-container">
        <Button type={'submit'}>Search</Button>
      </div>
    </form>
  )
}

export default searchForm
