import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import CourseContext from '../../context/course/courseContext';

import './VocabularyCard.css';

const VocabularyCard = props => {
  const { word } = props;
  const courseContext = useContext(CourseContext);
  const history = useHistory();

  const { selectVocabulary, currentVocabulary } = courseContext;
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if(currentVocabulary) {
      history.push('/word');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVocabulary])

  const onSeeWholeCard = () => {
    selectVocabulary(word);
  }

  return (
    <div className="vocabulary-card-container">
      <div 
        className={`vocabulary-card ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="vocabulary-card-front">
          <div className="vocabulary-card-content">{word.word}</div>
        </div>
        <div className="vocabulary-card-back">
          <div className="vocabulary-card-content">{word.translation[0]}</div>
        </div>
      </div>
      
      <Button type={'button'} onClick={onSeeWholeCard} design={'plain-text'} >See whole card</Button>
    </div>

  )
}

export default VocabularyCard
