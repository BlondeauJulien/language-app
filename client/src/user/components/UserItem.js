import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './UserItem.css';

const UserItem = props => {
  return (
    <div className="user-item">
      <div className="user-item__infos">
        <span className="user-item__username">Julien</span>
        <span className="user-item__email">email@email.email</span>
        <span className="user-item__role">user</span>
        <span className="user-item__status">banned</span>
      </div>
      <div className="user-item__actions">
        <Button type={'button'}>Role</Button>
        <Button type={'button'}>Ban</Button>
      </div>
    </div>
  )
}

export default UserItem
