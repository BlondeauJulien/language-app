import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';
import Button from '../FormElements/Button';
import AuthContext from '../../../context/auth/authContext';

import './MainHeader.css'

const MainHeader = props => {
  const authContext = useContext(AuthContext);

  const { logUser, user } = authContext;
  const { authForm, setAuthForm } = props;

  useEffect(() => {
    const tokenLS = localStorage.getItem('token');
    if(!user && tokenLS) {
      logUser(tokenLS);
    }
  }, [user]);


  return (
    <header>
      <div className="header-content-container">
        <Link to='/'>
          <div className="brand-name-container">
            <i className="fas fa-language"></i>
            <h1>LEARN</h1>
          </div>
        </Link>
        <div className="auth-nav-container">
          {user ? (
            <nav>
              <NavLinks />
            </nav>
          ) : (
            <div className="auth-buttons">
              <Button 
                onClick={() => setAuthForm({...authForm, show: true, component: 'login'})} 
                type={'button'} 
                design={'primary-bg'}
                className={'hide-under-560'}
              >
                LOG IN TO YOUR ACCOUNT
              </Button>
              <Button 
                onClick={() => setAuthForm({...authForm, show: true, component: 'signup'})}
                type={'button'} 
                design={'primary-txt-white-bg'}
              >
                SIGN UP
                <span className="mobile-text-complement">/IN</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default MainHeader
