import React from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import ActionsContainer from '../../shared/components/UIElements/ActionsContainer';

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome>
        <ActionsContainer />
      </MainPageContentContainer>
    </div>
  )
}

export default Home
