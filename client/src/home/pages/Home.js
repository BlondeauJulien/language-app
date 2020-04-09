import React from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer'

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome/>
    </div>
  )
}

export default Home
