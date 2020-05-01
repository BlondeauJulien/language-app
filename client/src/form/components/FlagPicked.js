import React, { useState, useEffect } from 'react';

import Flags from '../../shared/util/countriesFlags';
import Flag from '../../shared/components/UIElements/Flag';

import './FlagPicked.css';
import Button from '../../shared/components/FormElements/Button';

const FlagPicked = (props) => {
	const [ flag, setFlag ] = useState(null);

	useEffect(
		() => {
			for (const flag of Flags) {
				if (flag.code === props.flag) {
					const flagToDisplay = (
						<div className="flag-container">
							<Flag countryCode={flag.code} countryName={flag.name} />
							<span>{flag.name}</span>
              <div className="flag-picked-change-btn">
							  <Button type="button" design={'plain-text'} onClick={props.resetFlag}>CHANGE</Button>
              </div>
						</div>
					);
					setFlag(flagToDisplay);
				}
			}
		},
		[ ]
	);

	return <div>{flag}</div>;
};

export default FlagPicked;
