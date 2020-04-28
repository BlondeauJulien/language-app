import React, { useState } from 'react';

import InfoElement from './InfoElement';
import Button from '../../shared/components/FormElements/Button';
import Spinner from '../../shared/SVGImages/Spinner';
import Input from '../../shared/components/FormElements/Input';

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
      {/* A mettre en place, should pass to edit mode if click on infoelement */}
      <InfoElement title={'USERNAME'} infoValue={props.user.username}/>
      <InfoElement title={'EMAIL'} infoValue={props.user.email}/>
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
        <form onSubmit={onSubmit} className="user-infos__form-delete">
          <Input 
            element={'input'}
            type={'password'}
            id={'password'}
            value={deleteForm.password}
            onChange={e => setDeleteForm({...deleteForm, password: e.target.value})}
            placeholder={'password'}
            label={'Enter password to confirm.'}
            htmlFor={'password'}
          />
          <Button type={'submit'}>DELETE</Button>
          <Button type={'button'} onClick={onCancelDelete}>Cancel</Button>
        </form>
      )}
    </div>

  )
}

export default ProfileInfos
