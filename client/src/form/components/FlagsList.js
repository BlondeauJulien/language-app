import React from 'react';

import Flags from '../../shared/util/countriesFlags';
import Flag from '../../shared/components/UIElements/Flag';


import './FlagsList.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const FlagsList = () => {
  const displayAllFlags = false;

  return (
    <div className="flags-list-component">
      <div className="flags-list-search">
        <Input element="input" placeholder="Search course flag" />
      </div>
      <div className="flags-container">
        {Flags.map(flag => (
          <div className="flag-container">
            <Flag countryCode={flag.code} countryName={flag.name}/>
            <span>{flag.name}</span>
          </div>
        ))}
      </div>
      <div className="flags-button">
        <Button type="button" design="plain-text">See All</Button>
      </div>
    </div>
  )
}

export default FlagsList
