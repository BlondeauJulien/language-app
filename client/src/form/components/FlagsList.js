import React, { useState } from 'react';

import Flags from '../../shared/util/countriesFlags';
import Flag from '../../shared/components/UIElements/Flag';

import './FlagsList.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const FlagsList = () => {
  const [displayAllFlags, setDisplayAllFlags] = useState(false);
  
  const flagsEl = () => {
    let flags = []
    for(let i = 0; i < Flags.length; i++) {
      if(!displayAllFlags && i === 8) break;

      let content = (
        <div className="flag-container">
          <Flag countryCode={Flags[i].code} countryName={Flags[i].name} />
          <span>{Flags[i].name}</span>
        </div>
      )

      flags.push(content);
    }
    return flags;
  }

	return (
		<div className="flags-list-component">
			<div className="flags-list-search">
				<Input element="input" placeholder="Search course flag" />
			</div>
			<div className="flags-container">
        {
          flagsEl()
        }
			</div>
			<div className="flags-button">
				<Button type="button" design="plain-text" onClick={() => setDisplayAllFlags(!displayAllFlags)}>
					See All
				</Button>
			</div>
		</div>
	);
};

export default FlagsList;
