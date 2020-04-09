import React, { Children } from 'react';

import './MainPageContentContainer.css';

const MainPageContentContainer = props => {
  return (
    <main className={`main-container main-container-size-${props.size || 'default' } 
    ${props.mainHome ? 'main-container-home' : '' }`}>
      {props.children}
    </main>
  )
}

export default MainPageContentContainer
