import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './ProfileNav.css';

const ProfileNav = () => {
  const isSelected = 'profile';
  return (
    <nav className="profile-navigation">
      <ul className="profile-navigation__ul">
        <li className={`profile-navigation__li${isSelected === 'profile' ? '-selected' : ''}`}>
          <Button type={'button'} design={'plain-text'}>Profile</Button>
        </li>
        <li className={`profile-navigation__li${isSelected === 'courses' ? '-selected' : ''}`}>
          <Button type={'button'} design={'plain-text'}>My Courses</Button>
        </li>
      </ul>
    </nav>
  )
}

export default ProfileNav
