import React from 'react';

import './MainPageContentContainer.css';

const MainPageContentContainer = props => {
  return (
    <main className={`main-container main-container-size-${props.size || 'default' } 
      ${props.mainHome ? 'main-container-home' : '' }`}>
    </main>
  )
}

export default MainPageContentContainer
