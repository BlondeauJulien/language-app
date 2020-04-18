import React from 'react';

import UserItem from '../components/UserItem';

import './UsersList.css';

const UsersList = () => {
  return (
    <div className="users-list">
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
    </div>
  )
}

export default UsersList
