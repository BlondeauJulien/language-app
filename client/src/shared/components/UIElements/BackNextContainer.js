import React from 'react';

import './BackNextContainer.css';

const BackNextContainer = props => {
	const { onClickNext, onClickPrevious } = props
	return (
		<div className="back-next-arrows-container">
			<div>
				<i className="fas fa-chevron-left chevron-large" onClick={onClickPrevious}/>
			</div>
      <div>
        {props.children}
      </div>
			<div>
				<i className="fas fa-chevron-right chevron-large" onClick={onClickNext}/>
			</div>
		</div>
	);
};

export default BackNextContainer;
