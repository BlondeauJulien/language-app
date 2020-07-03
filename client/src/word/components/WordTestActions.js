import React, { useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import AlgoInfosBox from './AlgoInfosBox';

import './WordTestActions.css';

const WordTestActions = props => {
	const {onClickTestAction } = props;
	const [ openInfoBox, setOpenInfoBox ] = useState(false);

	return (
		<div className="word-test-actions">
			<div className="word-test-actions-title">
				<h3>How well do you know this word?</h3>
				{
					!openInfoBox && (
						<Button 
							type="button" 
							design="plain-text" 
							size="button-mid"
							onClick={() => setOpenInfoBox(true)}
						>
							how does it work?
						</Button>
					)
				}
			</div>
			{
				openInfoBox && <AlgoInfosBox setOpenInfoBox={setOpenInfoBox}/>
			}
			<div className="word-test-actions-buttons">
				<div className="button-word-test-1">
					<Button type="button" onClick={() => onClickTestAction('well')}>well</Button>
				</div>
				<div className="button-word-test-2">
					<Button type="button" onClick={() => onClickTestAction('decently')}>decently</Button>
				</div>
				<div className="button-word-test-3">
					<Button type="button" onClick={() => onClickTestAction('somewhat')}>somewhat</Button>
				</div>
				<div className="button-word-test-4">
					<Button type="button" onClick={() => onClickTestAction('poorly')}>poorly</Button>
				</div>
				<div className="button-word-test-5">
					<Button type="button" onClick={() => onClickTestAction('bad')}>bad</Button>
				</div>
			</div>
		</div>
	);
};

export default WordTestActions;
