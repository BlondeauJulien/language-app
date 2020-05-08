import React, { useContext, useEffect, useState } from 'react';
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
    onSetWordToEdit,
    vocabularyToEdit
  } = courseContext;
  const { user, token } = authContext;
  const [ displayWordInfos, setDisplayWordInfo ] = useState(false);

  useEffect(() => {
    return () => {
      selectVocabulary(null);
      resetCourseSuccess();
    }
  }, []);

  if(vocabularyToEdit) {
    history.push('/form/vocabulary');
    return null;
  }

  if(!currentVocabulary) {
    history.push('/course');
    return null;
  }

  return (
    <MainPageContentContainer>
      <div className="vocab-creator-actions">
        <UserContentActionsButtons 
          onClickEdit={() => onSetWordToEdit(currentVocabulary)}
          onClickDelete={() => deleteVocabulary(currentVocabulary._id, token)}
        />
      </div>
      <BackNextContainer>
        <div className="word-main">
          <WordHeader word={currentVocabulary.word} displayWordInfos={displayWordInfos} setDisplayWordInfo={setDisplayWordInfo}/>
          {
            displayWordInfos && <WordInfos word={currentVocabulary} />
          }
        </div>
      </BackNextContainer>
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
