import React from 'react';

import InfoElement from './InfoElement';
import Button from '../../shared/components/FormElements/Button';

import './ProfileInfos.css';

const ProfileInfos = () => {
  return (
    <div className="profile-infos-container">
      <h3>hello, Username</h3>
      {/* A mettre en place, should pass to edit mode if click on infoelement */}
      <InfoElement title={'USERNAME'}/>
      <InfoElement title={'EMAIL'}/>
      <div className="profil-infos-buttons">
        <Button type="button" >EDIT</Button>
        <Button type="button" design={'danger'}>LOG OUT</Button>
        <Button type="button" design={'plain-text-danger'}>DELETE ACCOUNT</Button>
      </div>
    </div>

  )
}

export default ProfileInfos