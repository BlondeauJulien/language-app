import React from 'react';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';

import './Info.css';

const Info = () => {
  return (
    <MainPageContentContainer>
      <div className="about-section">
        <h2 className="info-title">About</h2>
        <div className="about__text">
          <p>This site is part of my portfolio and has no commercial use.</p>
          <p>The idea came after I started to learn Norwegian and used a few language apps. I thought making my own small language learning app would make a great portfolio project in relation with my current hobbie.</p>
        </div>
      </div>
      <div className="contact-section">
        <h2 className="info-title">Contact</h2>
        <div className="contact-section__links">
          <a className="contact-link" href="mailto:julienblondeaupro@protonmail.com">julienblondeaupro@protonmail.com</a>
          <a href="https://julienblondeau.com">julienblondeau.com</a>.
        </div>
        <div>
          <p className="info-warning">All the footer links end up here as they are there just to fill the space and for decoration purpose.</p>
        </div>
      </div>
    </MainPageContentContainer>
  )
}

export default Info;
