import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const { 
    currentVocabulary, 
    deleteVocabulary, 
    success, 
    error, 
    loading, 
    selectVocabulary, 
    resetCourseSuccess, 
    setWordToEdit,
    vocabularyToEdit,
    currentCourse,
    clearSearchContent
  } = courseContext;
  const { user, token } = authContext;
  const [ displayWordInfos, setDisplayWordInfo ] = useState(false);
  const [ redirect, setRedirect ] = useState({
    toVocabularyForm: false,
    toCoursePage: false
  });

  useEffect(() => {
    return () => {
      const regex = /course|quiz|word/gi;
      const isMatch = regex.test(history.location.pathname);
      if(!isMatch || /form/gi.test(history.location.pathname)) {
        clearSearchContent();
      }
    }
  }, []);

  useEffect(() => {
    if(redirect.toVocabularyForm) {
      history.push('/form/vocabulary');
    } else if (redirect.toCoursePage) {
      history.push('/course');
    }
    return () => {
      selectVocabulary(null);
      resetCourseSuccess();
    }
  }, [ redirect ]);

  if(vocabularyToEdit && !success) {
    !redirect.toVocabularyForm && setRedirect({...redirect, toVocabularyForm: true});
  }

  if(!currentVocabulary && !success) {
    !redirect.toCoursePage && setRedirect({...redirect, toCoursePage: true});
  }

  const onClickEdit = () => setWordToEdit(currentVocabulary);
  const onClickDelete = () => deleteVocabulary(currentVocabulary._id, token);

  return (
    <MainPageContentContainer>
      {
        currentVocabulary && (
          <Fragment>
            <div className="back-previous" onClick={() => setRedirect({...redirect, toCoursePage: true})}>
              <i className="fas fa-arrow-alt-circle-left"></i>
            </div>
            {
              user && currentCourse.creator._id === user.id && (
                <div className="vocab-creator-actions">
                  <UserContentActionsButtons 
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                  />
                </div>
              )
            }
            <BackNextContainer>
              <div className="word-main">
                <WordHeader word={currentVocabulary.word} displayWordInfos={displayWordInfos} setDisplayWordInfo={setDisplayWordInfo}/>
                {
                  displayWordInfos && <WordInfos word={currentVocabulary} />
                }
              </div>
            </BackNextContainer>
          </Fragment>
        )
      }
      {
        displayWordInfos && <WordTestActions />
      }
      {error && <p className="form-submit-error-message">{error}</p>}            
      {loading && <div className="course-page__spinner-container"><Spinner /></div>}
      {success && success.for === 'delete' && (
        <SuccessMessage redirectTo={'/course'} message={success.message} btnText={'Go back to course'}/>
      )}
    </MainPageContentContainer>
  )
}

export default Word
