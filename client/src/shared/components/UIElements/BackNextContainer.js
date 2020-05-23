import React, { Fragment } from 'react';

import './BackNextContainer.css';

const BackNextContainer = props => {
	const { onClickNext, onClickPrevious } = props
	return (
		<div className="back-next-arrows-container">
			<div>
				<i className="fas fa-chevron-left chevron-large" onClick={onClickPrevious}/>
			</div>
      <Fragment>
        {props.children}
      </Fragment>
			<div>
				<i className="fas fa-chevron-right chevron-large" onClick={onClickNext}/>
			</div>
		</div>
	);
};

export default BackNextContainer;
