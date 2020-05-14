import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './ProfileNav.css';

const ProfileNav = props => {
  const { componentToDisplay, setComponentToDisplay, setIsEditMode, userRole } = props;

  const onClickNavLink = component => {
    setIsEditMode(false);
    setComponentToDisplay(component)
  }

  return (
    <nav className="profile-navigation">
      <ul className="profile-navigation__ul">
        <li className={`profile-navigation__li${componentToDisplay === 'profile' ? '-selected' : ''}`}>
          <Button 
            type={'button'} 
            design={'plain-text'} 
            onClick={() => onClickNavLink('profile')}
          >
            Profile
          </Button>
        </li>
        <li className={`profile-navigation__li${componentToDisplay === 'courses' ? '-selected' : ''}`}>
          <Button 
            type={'button'} 
            design={'plain-text'}
            onClick={() => onClickNavLink('courses')}
          >
            My Courses
          </Button>
        </li>
        {

        }
        {
          userRole === "moderator" || userRole === "admin" && (
            <li className={`profile-navigation__li${componentToDisplay === 'review' ? '-selected' : ''}`}>
              <Button type={'button'} design={'plain-text'}>To Review</Button>
            </li>
          )
        }
        {
          userRole === "admin" && (
            <li className={`profile-navigation__li${componentToDisplay === 'users' ? '-selected' : ''}`}>
              <Button type={'button'} design={'plain-text'}>Users</Button>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default ProfileNav
