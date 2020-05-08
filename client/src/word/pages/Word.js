import React, { useContext, useEffect } from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import BackNextContainer from '../../shared/components/UIElements/BackNextContainer';
import WordTestActions from '../components/WordTestActions';
import WordHeader from '../components/WordHeader';
import WordInfos from '../components/WordInfos';
import Spinner from '../../shared/SVGImages/Spinner';
import UserContentActionsButtons from '../../shared/components/FormElements/UserContentActionsButtons';
import SuccessMessage from '../../shared/components/UIElements/SuccessMessage';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';

import './Word.css';

const Word = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);

  const { currentVocabulary, deleteVocabulary, success, error, loading, resetCourseSuccess } = courseContext;
  const { user, token } = authContext;

  useEffect(() => {
    return () => {
      resetCourseSuccess();
    }
  }, []);


  let word = {
    word: 'Le motLe motLe motLe motLe mot1234',
    translation: ['translation 1', 'translation 2', 'translation 3'],
    phrases: [{origin: 'phrase 1 is a phrase', translation: 'And this is the translation'},
    {origin: 'phrase 1 is a phrase', translation: 'And this is the translation'},
    {origin: 'phrase 1 is a phrase', translation: 'And this is the translation'}],
    conjugationLink: 'https://www.google.com/',
    personalNote: 'This is a note',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
  }


  return (
    <MainPageContentContainer>
      <div className="vocab-creator-actions">
        <UserContentActionsButtons onClickDelete={() => deleteVocabulary(currentVocabulary._id, token)}/>
      </div>
      <BackNextContainer>
        <div className="word-main">
          <WordHeader word={word.word} />
          <WordInfos word={word} />
        </div>
      </BackNextContainer>
      <WordTestActions />
      {error && <p className="form-submit-error-message">{error}</p>}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/course'} message={success.message} btnText={'Go back to course'}/>
      )}
    </MainPageContentContainer>
  )
}

export default Word
