import React from 'react';

import SearchLogo from '../../SVGImages/SearchLogo';
import CreateLogo from '../../SVGImages/CreateLogo';
import Button from '../FormElements/Button';

import './ActionsContainer.css';

const ActionsContainer = () => {
  return (
    <div className="actions-container">
      <div className="action-container">
        <div className="action-image">
          <SearchLogo />
        </div>
        <div className="action-content">
          <h3>Search a course</h3>
          <input></input>
        </div>
      </div>
      <div className="action-container">
        <div className="action-image">
          <CreateLogo />
        </div>
        <div className="action-content">
          <h3>Create your own</h3>
          <Button type={"button"} size={'button-full-length'}>Create</Button>
        </div>
      </div>
    </div>
  )
}

export default ActionsContainer
