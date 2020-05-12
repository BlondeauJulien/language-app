import React, { useState, useEffect } from 'react';

import './CourseContentSearchForm.css';
import Button from '../../shared/components/FormElements/Button';
import QuizSearch from './QuizSearch';
import VocabularySearch from './VocabularySearch';

const CourseContentSearchForm = props => {
  const { contentToDisplay, setContentToDisplay, setSearchContent} = props;
  let initialFormState = {
    difficultyLevel: '',
    tags: ''
  }
  const [ form, setForm ] = useState(initialFormState);

  useEffect(() => {
    if(contentToDisplay === 'word') {
      setForm({...form, word: '', translation: ''})
    } else {
      setForm(initialFormState);
    }
  }, [contentToDisplay])

  const onSubmit = e => {
    e.preventDefault();
    setSearchContent(form, contentToDisplay)
  }
  
  return (
    <form onSubmit={onSubmit} className="form-search-course-content">
      <div className="search-coourse-content-header">
        <span className={`${contentToDisplay !== 'word' ? 'button-course-unselected' : ''}`}>
          <Button type={'button'} design={'plain-text'} onClick={() => setContentToDisplay('word')}>Words</Button>
        </span>
        <span className="separator"></span>
        <span className={`${contentToDisplay !== 'quiz' ? 'button-course-unselected' : ''}`}>
          <Button type={'button'} design={'plain-text'} onClick={() => setContentToDisplay('quiz')}>Quizzes</Button>
        </span>
      </div>
      <div className="search-course-content-inputs-container">
        {
          contentToDisplay === 'word' ? (
            <VocabularySearch form={form} setForm={setForm}/>
          ) : (
            <QuizSearch />
          )
        }
      </div>
      <div className="search-submit-container">
        <Button type={'submit'}>Search</Button>
      </div>
    </form>
  )
}

export default CourseContentSearchForm
