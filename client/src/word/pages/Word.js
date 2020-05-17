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
  const [wordSeen, setWordSeen ] = useState({
    index: 0,
    list: []
  });

  useEffect(() => {
    if(currentCourse && !localStorage.getItem(currentCourse._id)) {
      localStorage.setItem(currentCourse._id, JSON.stringify({
        well: {},
        decently: {},
        somewhat: {},
        poorly: {},
        bad: {},
      }))
    }
    if(currentVocabulary) {
      setWordSeen({...wordSeen, index: 0, list : [currentVocabulary._id]})
    }
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

  const onClickNextWord = () => {
    setDisplayWordInfo(false);
    const randomNbr = Math.floor(Math.random() * 100) + 1;

    let nextWillBeFrom;
    if(randomNbr <= 50 ) nextWillBeFrom = 'all';
    if(randomNbr > 50 && randomNbr <= 70 ) nextWillBeFrom = 'bad';
    if(randomNbr > 70 && randomNbr <= 85 ) nextWillBeFrom = 'poorly';
    if(randomNbr > 85 && randomNbr <= 95 ) nextWillBeFrom = 'somewhat';
    if(randomNbr > 95 ) nextWillBeFrom = 'decently';

    let nextWord;
    if(nextWillBeFrom === 'all') {
      let randomIndex = Math.floor(Math.random() * currentCourse.vocabulary.length);
      nextWord = currentCourse.vocabulary[randomIndex];
      selectVocabulary(nextWord);
    } else {
      let difficultiesObj = JSON.parse(localStorage.getItem(currentCourse._id))
      let wordsListObj = difficultiesObj[nextWillBeFrom];
      let wordsListArr = Object.keys(wordsListObj)

      if(!wordsListArr.length) {
        onClickNextWord();
      } else {
        let randomIndex = Math.floor(Math.random() * wordsListArr.length);
        let nextWordId = wordsListArr[randomIndex];
        nextWord = currentCourse.vocabulary.find(w => w._id === nextWordId);
        if(!nextWord) {
          delete wordsListObj[nextWordId];
          localStorage.setItem(currentCourse._id, JSON.stringify(difficultiesObj))
          onClickNextWord();
        } else {
          selectVocabulary(nextWord);
        }
      }
    }
  }

  const onClickPreviousWord = () => {
    
  }

  const onClickTestAction = actionValue => {
    let wordDifficultyObj = JSON.parse(localStorage.getItem(currentCourse._id));
    for (const difficulty in wordDifficultyObj) {
      if(wordDifficultyObj[difficulty][currentVocabulary._id]) {
        delete wordDifficultyObj[difficulty][currentVocabulary._id];
      }
    }
    wordDifficultyObj[actionValue][currentVocabulary._id] = currentVocabulary._id;
    localStorage.setItem(currentCourse._id, JSON.stringify(wordDifficultyObj));
    onClickNextWord();
  }

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
            <BackNextContainer onClickNext={onClickNextWord}>
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
        displayWordInfos && <WordTestActions onClickTestAction={onClickTestAction}/>
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
