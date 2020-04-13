import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';


import './ProfileForm.css';

const ProfileForm = () => {
  return (
    <form className="profile-form">
      <h3>Edit Profile</h3>
      <div className="profile-form__input-container">
        <Input element={'input'} type={'text'} wrapperDesign={'auth'} label={'USERNAME'}/>
      </div>
      <div className="profile-form__input-container">
        <Input element={'input'} type={'email'} wrapperDesign={'auth'} label={'EMAIL'}/>
      </div>
      <div className="profile-form__input-container">
        <Input element={'input'} type={'password'} wrapperDesign={'auth'} label={'NEW PASSWORD'}/>
      </div>
      <div className="profile-form__input-container">
        <Input element={'input'} type={'password'} wrapperDesign={'auth'} label={'CURRENT PASSWORD'}/>
      </div>
      <div className="profile-form__submit-container">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

export default ProfileForm
