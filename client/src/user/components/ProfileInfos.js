import React, { useState } from 'react';

import InfoElement from './InfoElement';
import Button from '../../shared/components/FormElements/Button';
import Spinner from '../../shared/SVGImages/Spinner';
import PasswordForm from '../../shared/components/FormElements/PasswordForm';


import './ProfileInfos.css';

const ProfileInfos = props => {
  const [openDeleteForm, setOpenDeleteForm ] = useState(false);
  const [deleteForm, setDeleteForm] = useState({
    password: ''
  });

  const onCancelDelete = () => {
    setDeleteForm({...deleteForm, password: ''})
    setOpenDeleteForm(false);
  }

  const onSubmit = e => {
    e.preventDefault();
    props.deleteUser(deleteForm);
  }

  return (
    <div className="profile-infos-container">
      <h3>hello, {props.user.username}</h3>
      <InfoElement title={'USERNAME'} infoValue={props.user.username} setIsEditMode={props.setIsEditMode}/>
      <InfoElement title={'EMAIL'} infoValue={props.user.email} setIsEditMode={props.setIsEditMode}/>
      {props.loading ? (
        <Spinner />
      ) : (
        (
          <div className="profil-infos-buttons">
            <Button type="button" onClick={() => props.setIsEditMode(true)}>EDIT</Button>
            <Button type="button" design={'danger'} onClick={props.logout}>LOG OUT</Button>
            <Button type="button" design={'plain-text-danger'}  onClick={() => {setOpenDeleteForm(true)}}>DELETE ACCOUNT</Button>
          </div>
        )
      )}

      {openDeleteForm && (
        <PasswordForm 
          onSubmit={onSubmit}
          onCancel={() => setOpenDeleteForm(false)}
          onChange={e => setDeleteForm({...deleteForm, password: e.target.value})}
          value={deleteForm.password}
        />
      )}
    </div>

  )
}

export default ProfileInfos
