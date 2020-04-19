import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './WordHeader.css';

const WordHeader = props => {
	return (
		<div className="word-header">
			<h2>{props.word}</h2>
			<div className="word-open-infos">
				<i class="fas fa-caret-down" />
				<Button type="button" design={'plain-text'}>
					see more
				</Button>
				<i class="fas fa-caret-down" />
			</div>
		</div>
	);
};

export default WordHeader;