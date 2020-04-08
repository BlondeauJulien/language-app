import React from 'react';

import NavLinks from './NavLinks';
import Button from '../FormElements/Button';

import './MainHeader.css'

const MainHeader = () => {
  return (
    <header>
      <div className="header-content-container">
        <div className="brand-name-container">
          <i className="fas fa-language"></i>
          <h1>LEARN</h1>
        </div>
        <div className="auth-nav-container">
{/*           <nav>
            <NavLinks />
          </nav> */}
          <div className="auth-buttons">
            <Button type={'button'} design={'primary-bg'}>LOG IN TO YOUR ACCOUNT</Button>
            <Button type={'button'} design={'primary-txt-white-bg'}>SIGN UP</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainHeader
