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
          <p key={'translation-' + i}>{i+1 + ` - `}{t}</p>
        ))}
      </div>
    </div>
    <div className="word-info">
      <h3 className="word-info-title">Phrases:</h3>
      <div className="word-info-content-multiple">
        {word.phrases.map((phrase, i) => (
          <p key={'phrase-' + i}>{i+1 + ` - `}{phrase.origin} / {phrase.translation}</p>
        ))}
      </div>
    </div>
    <div className="word-info">
      <h3 className="word-info-title">Conjugation/grammar link:</h3>
      <div className="word-info-content">
        <a className="word-conjugation-link" href={word.conjugationLink}>
          {word.conjugationLink.length <= 45 ?
            word.conjugationLink :
            word.conjugationLink.substring(0, 40) + '...'
          }
        </a>
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
