import React, { useState, useEffect, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import QuizSearch from './QuizSearch';
import VocabularySearch from './VocabularySearch';
import CourseContext from '../../context/course/courseContext';

import './CourseContentSearchForm.css';

const CourseContentSearchForm = props => {
  const courseContext = useContext(CourseContext);

  const { searchVocabulary, searchQuiz, setSearchContent } = courseContext;
  const { contentToDisplay, setContentToDisplay, setCurrentPage} = props;
  const [ form, setForm ] = useState(contentToDisplay === 'word' ? {...searchVocabulary} : {...searchQuiz});

  useEffect(() => {
    if(contentToDisplay === 'word') {
      setForm({...searchVocabulary})
    } else {
      setForm({...searchQuiz});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentToDisplay])

  const onSubmit = e => {
    e.preventDefault();
    setCurrentPage(1)
    setSearchContent(form, contentToDisplay);
  }
  
  return (
    <form onSubmit={onSubmit} className="form-search-course-content">
      <div className="search-course-content-header">
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
            <QuizSearch form={form} setForm={setForm}/>
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
