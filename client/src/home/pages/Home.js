import React from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import ActionsContainer from '../../shared/components/UIElements/ActionsContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import CardsContainerHeader from '../../shared/components/UIElements/CardsContainerHeader';

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome>
        <ActionsContainer />
        <CardsContainerHeader title={'Trending Courses'}/>
        <CardsContainer />
      </MainPageContentContainer>
    </div>
  )
}

export default Home
