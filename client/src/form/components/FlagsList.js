import React, { useState } from 'react';

import Flags from '../../shared/util/countriesFlags';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { getFilteredFlags } from '../util/flagFn';

import './FlagsList.css';

const FlagsList = props => {
  const { pickFlagHandler } = props;
  const [displayAllFlags, setDisplayAllFlags] = useState(false);
  const [searchFlag, setSearchFlag] = useState('');
  
  const flagsEl = () => {
    return getFilteredFlags(Flags, displayAllFlags, pickFlagHandler, searchFlag);
  }

  const onChangeSearch = e => {
    setDisplayAllFlags(true);
    setSearchFlag(e.target.value);
  }

	return (
		<div className="flags-list-component">
			<div className="flags-list-search">
        <Input 
          element="input" 
          id={'searchFlag'}
          value={searchFlag}
          onChange={onChangeSearch}
          type={'text'}
          placeholder="Search course flag" 
        />
			</div>
			<div className="flags-container">
        {
          flagsEl()
        }
			</div>
      {
        !searchFlag && (
          <div className="flags-button">
            <Button type="button" design="plain-text" onClick={() => setDisplayAllFlags(!displayAllFlags)}>
              {displayAllFlags ?	'SEE LESS' : 'SEE ALL'}
            </Button>
          </div>
        )
      }
		</div>
	);
};

export default FlagsList;
