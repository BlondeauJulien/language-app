import React from 'react';
import { Link } from 'react-router-dom';

import SearchLogo from '../../SVGImages/SearchLogo';
import CreateLogo from '../../SVGImages/CreateLogo';
import Button from '../FormElements/Button';
import Input from '../FormElements/Input';

import './ActionsContainer.css';

const ActionsContainer = () => {
  const logo = (<i className="fas fa-search" style={{'color': 'var(--brand-color)', 'marginRight': '8px'}}></i>)
  return (
    <div className="actions-container">
      <div className="action-container">
        <div className="action-image">
          <SearchLogo />
        </div>
        <div className="action-content">
          <h3>
            Search a course{` `}
            <Link to="/search" style={{'font-size': '0.6rem', 'color': 'var(--brand-color)'}}>
              advanced
            </Link>
          </h3>
          <div >
            <Input 
              element={'input'}
              id={"search-course"}
              type={'text'}
              placeholder={'e.g., Norwegian, French...'}
              logo={logo}
            />
          </div>

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
