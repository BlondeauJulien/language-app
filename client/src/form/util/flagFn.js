import React from 'react';
import Flag from '../../shared/components/UIElements/Flag';
import Button from '../../shared/components/FormElements/Button';

export const getFilteredFlags = (flaglist, displayAllFlags, pickFlagHandler, searchFlag) => {
  let flags = []
  for(let i = 0; i < flaglist.length; i++) {
    if(!displayAllFlags && i === 8) break;

    let content = (
      <div key={flaglist[i].code} className="flag-container" onClick={() => pickFlagHandler(flaglist[i].code)}>
        <Flag countryCode={flaglist[i].code} countryName={flaglist[i].name} />
        <span>{flaglist[i].name}</span>
      </div>
    )
    let searchInput = new RegExp(searchFlag, 'gi');
    if(flaglist[i].name.match(searchInput)) {
      flags.push(content);
    }
  }
  return flags;
}

export const getFlagToDisplay = (flaglist, pickedFlagCode, resetFlag) => {
  for (const flag of flaglist) {
    if (flag.code === pickedFlagCode) {
      const flagToDisplay = (
        <div className="flag-container">
          <Flag countryCode={flag.code} countryName={flag.name} />
          <span>{flag.name}</span>
          <div className="flag-picked-change-btn">
            <Button type="button" design={'plain-text'} onClick={resetFlag}>CHANGE</Button>
          </div>
        </div>
      );
      return flagToDisplay;
    }
  }
  return null;
}