import React, { useState, useEffect } from 'react';

import Flags from '../../shared/util/countriesFlags';
import { getFlagToDisplay } from '../util/flagFn';

import './FlagPicked.css';

const FlagPicked = props => {
	const [ flag, setFlag ] = useState(null);

	useEffect(() => {
		const flagToDisplay = getFlagToDisplay(Flags, props.flag, props.resetFlag);
		setFlag(flagToDisplay);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div>{flag}</div>;
};

export default FlagPicked;
