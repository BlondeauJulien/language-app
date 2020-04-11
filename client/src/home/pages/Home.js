import React from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import ActionsContainer from '../../shared/components/UIElements/ActionsContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import CardsContainerHeader from '../../shared/components/UIElements/CardsContainerHeader';

const Home = () => {
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
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome>
        <ActionsContainer />
        <CardsContainerHeader title={'Trending Courses'}/>
        <CardsContainer courses={courses}/>
      </MainPageContentContainer>
    </div>
  )
}

export default Home