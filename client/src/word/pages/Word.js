import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import BackNextContainer from '../../shared/components/UIElements/BackNextContainer';
import WordTestActions from '../components/WordTestActions';
import WordHeader from '../components/WordHeader';
import WordInfos from '../components/WordInfos';

import './Word.css';

const Word = () => {
  let word = {
    word: 'Le mot',
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
      <BackNextContainer>
        <div className="word-main">
          <WordHeader word={word.word} />
          <WordInfos word={word} />
        </div>
      </BackNextContainer>
      <WordTestActions />
    </MainPageContentContainer>
  )
}

export default Word
