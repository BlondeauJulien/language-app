import React from 'react';

import './WordInfos.css';

const WordInfos = props => {
  const { word } = props;
  return (
    <div className="word-infos">
    <div className="word-info">
      <h3 className="word-info-title">Translation:</h3>
      <div className="word-info-content-multiple">
        {word.translation.map((t, i) => (
          <p key={'translation-' + i}>{t}</p>
        ))}
      </div>
    </div>
    <div className="word-info">
      <h3 className="word-info-title">Phrases:</h3>
      <div className="word-info-content-multiple">
        {word.phrases.map((phrase, i) => (
          <p key={'phrase-' + i}>{phrase.origin} / {phrase.translation}</p>
        ))}
      </div>
    </div>
    <div className="word-info">
      <h3 className="word-info-title">Conjugation/grammar link:</h3>
      <div className="word-info-content">
        <p>{word.conjugationLink}</p>
      </div>
    </div>
    <div className="word-info">
      <h3 className="word-info-title">Note:</h3>
      <div className="word-info-content">
        <p>{word.personalNote}</p>
      </div>
    </div>
    <div className="word-info">
      <h3 className="word-info-title">Tags:</h3>
      <div className="word-info-content tags-container">
        {word.tags.map((tag, i) => (
          <p key={'tag-' + i}>{tag}</p>
        ))}
      </div>
    </div>
  </div>
  )
}

export default WordInfos
