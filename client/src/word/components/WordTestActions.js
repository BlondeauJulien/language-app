import React from 'react';

import './WordTestActions.css';
import Button from '../../shared/components/FormElements/Button';

const WordTestActions = () => {
	return (
		<div className="word-test-actions">
			<div className="word-test-actions-title">
				<h3>How well do you know this word?</h3>
			</div>
			<div className="word-test-actions-buttons">
				<div className="button-word-test-1">
					<Button type="button">well</Button>
				</div>
				<div className="button-word-test-2">
					<Button type="button">decently</Button>
				</div>
				<div className="button-word-test-3">
					<Button type="button">somewhat</Button>
				</div>
				<div className="button-word-test-4">
					<Button type="button">poorly</Button>
				</div>
				<div className="button-word-test-5">
					<Button type="button">bad</Button>
				</div>
			</div>
		</div>
	);
};

export default WordTestActions;
