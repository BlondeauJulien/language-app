import React, { useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import CourseSearch from './CourseSearch';

import './SearchForm.css'

const SearchForm = props => {
  const [ form, setForm ] = useState({
    name: '',
    language: '',
    learningFrom: '',
    username: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    props.getCourses(form);
  }

  return (
    <form onSubmit={onSubmit}>
      <h3 className="search-title">Search a course</h3>
      <div className="search-inputs-container">
        <CourseSearch form={form} setForm={setForm}/>
      </div>
      <div className="search-submit-container">
        <Button type={'submit'}>Search</Button>
      </div>
    </form>
  )
}

export default SearchForm
