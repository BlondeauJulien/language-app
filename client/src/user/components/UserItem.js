import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './UserItem.css';

const UserItem = props => {
  const { user } = props;
  return (
    <div className="user-item">
      <div className="user-item__infos">
        <span className="user-item__username">{user.username}</span>
        <span className="user-item__email">{user.email}</span>
        <span className="user-item__role">{user.role}</span>
        <span className="user-item__status">{user.status}</span>
      </div>
      <div className="user-item__actions">
        <Button type={'button'}>Change Role</Button>
        <Button type={'button'}>Ban</Button>
      </div>
    </div>
  )
}

export default UserItem
