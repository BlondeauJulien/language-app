import React from 'react';

import './BackNextContainer.css';

const BackNextContainer = props => {
	return (
		<div className="back-next-arrows-container">
			<div>
				<i className="fas fa-chevron-left chevron-large" />
			</div>
      {props.children}
			<div>
				<i className="fas fa-chevron-right chevron-large" />
			</div>
		</div>
	);
};

export default BackNextContainer;
