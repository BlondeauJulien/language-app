import React from 'react';

import './WordTestActions.css';
import Button from '../../shared/components/FormElements/Button';

const WordTestActions = props => {
	const {onClickTestAction } = props;
	return (
		<div className="word-test-actions">
			<div className="word-test-actions-title">
				<h3>How well do you know this word?</h3>
			</div>
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
