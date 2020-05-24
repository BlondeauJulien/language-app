import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './WordHeader.css';

const WordHeader = props => {
	return (
		<div className={`word-header ${props.isUserWord ? 'word-header-margin-top' : ''}`}>
			<h2>{props.word}</h2>
			{
				!props.displayWordInfos && (
					<div className="word-open-infos">
						<i className="fas fa-caret-down" />
						<Button type="button" onClick={() => props.setDisplayWordInfo(true)} design={'plain-text'}>
							<span className='hide-under-560'>Know it? Forgot it?</span>Check word infos
						</Button>
						<i className="fas fa-caret-down" />
					</div>
				)
			}
		</div>
	);
};

export default WordHeader;
