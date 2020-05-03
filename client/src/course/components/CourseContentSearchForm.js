import React from 'react';

import './CourseContentSearchForm.css';
import Button from '../../shared/components/FormElements/Button';
import QuizSearch from './QuizSearch';
import VocabularySearch from './VocabularySearch';

const CourseContentSearchForm = props => {
  const { contentToDisplay, setContentToDisplay} = props;
  return (
    <form className="form-search-course-content">
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
            <VocabularySearch />
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
