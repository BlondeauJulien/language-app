import React from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/MainPageContentContainer/MainPageContentContainer'

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome/>
    </div>
  )
}

export default Home
