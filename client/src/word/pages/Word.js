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
import { getNextWordLocation, nextWordExist, getNextWord } from '../util/wordGameFunctions';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ redirect ]);

  if(vocabularyToEdit && !success) {
    !redirect.toVocabularyForm && setRedirect({...redirect, toVocabularyForm: true});
  }

  if(!currentVocabulary && !success) {
    !redirect.toCoursePage && setRedirect({...redirect, toCoursePage: true});
  }

  const onClickEdit = () => setWordToEdit(currentVocabulary);
  const onClickDelete = () => deleteVocabulary(currentVocabulary._id, token);

  const setWordSeenHelper = (newIndex, wordId) => {
    let changes = {index : newIndex};
    if(wordId) {
      changes.list = [...wordSeen.list, wordId];
    }
    setWordSeen({...wordSeen, ...changes});
  }

  const onClickNextWord = () => {
    setDisplayWordInfo(false);

    let nextWord = nextWordExist(wordSeen, currentCourse.vocabulary, setWordSeen);
    if(nextWord) {
      setWordSeenHelper(wordSeen.index + 1);
      selectVocabulary(nextWord);
      return;
    }

    let nextWordLocation = getNextWordLocation();
    if(nextWordLocation === 'all') {
      nextWord = getNextWord(currentCourse.vocabulary);

    } else {
      let difficultiesObj = JSON.parse(localStorage.getItem(currentCourse._id));
      let wordsListObj = difficultiesObj[nextWordLocation];
      let wordsListArr = Object.keys(wordsListObj);

      if(!wordsListArr.length) {
        nextWord = getNextWord(currentCourse.vocabulary);

      } else {
        nextWord = getNextWord(currentCourse.vocabulary, wordsListArr);
        if(!nextWord) {
          delete wordsListObj[nextWord.id];
          localStorage.setItem(currentCourse._id, JSON.stringify(difficultiesObj))
          nextWord = getNextWord(currentCourse.vocabulary); 
        }
      }
    }
    setWordSeenHelper(wordSeen.index + 1, nextWord.value._id);
    selectVocabulary(nextWord.value);
  }

  const onClickPreviousWord = () => {
    if(wordSeen.list[wordSeen.index - 1]) {
      let nextWordId = wordSeen.list[wordSeen.index - 1];
      let nextWord = currentCourse.vocabulary.find(w => w._id === nextWordId);
      setWordSeenHelper(wordSeen.index - 1)

      selectVocabulary(nextWord);
    } 
  }

  const onClickTestAction = difficultyListName => {
    let wordDifficultyObj = JSON.parse(localStorage.getItem(currentCourse._id));
    for (const listName in wordDifficultyObj) {
      if(wordDifficultyObj[listName][currentVocabulary._id]) {
        delete wordDifficultyObj[listName][currentVocabulary._id];
      }
    }
    wordDifficultyObj[difficultyListName][currentVocabulary._id] = currentVocabulary._id;
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
            <BackNextContainer onClickNext={onClickNextWord} onClickPrevious={onClickPreviousWord}>
              <div className="word-main">
                <WordHeader 
                  word={currentVocabulary.word} 
                  displayWordInfos={displayWordInfos} 
                  setDisplayWordInfo={setDisplayWordInfo}
                  isUserWord={user && currentCourse.creator._id === user.id}
                />
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
