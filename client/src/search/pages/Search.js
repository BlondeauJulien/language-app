import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import SearchForm from '../components/SearchForm';

import './Search.css'

const Search = () => {
  let courses = [
    {
      name: 'Learn Norwegian colours',
      countryFlag: 'NO',
      language: 'Norwegian',
      learningFrom: 'French',
      creator: {
        username: 'julien'
      }
    },
    {
      name: 'Learn Norwegian colours',
      countryFlag: 'NO',
      language: 'Norwegian',
      learningFrom: 'French',
      creator: {
        username: 'julien123456789'
      }
    },
    {
      name: 'Learn Norwegian colours Learn Norwegian colours',
      countryFlag: 'NO',
      language: 'Norwegian',
      learningFrom: 'French',
      creator: {
        username: 'julien'
      }
    },
  ]

  return (
    <MainPageContentContainer>
      <div className="search-form-container">
        <SearchForm />
      </div>
      <CardsContainer courses={courses}/>
    </MainPageContentContainer>
  )
}

export default Search
