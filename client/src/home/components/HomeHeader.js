import React from 'react';

import LaptopSVGImage from './LaptopSVGImage';

import './HomeHeader.css';

const HomeHeader = () => {
	return (
		<div className="home-header-cont">
      <div className="home-header">
        <h2 className="home-header--title">Learn a new language by creating your own cards and quizzes</h2>
        <LaptopSVGImage />
      </div>
		</div>
	);
};

export default HomeHeader;
