import React, { useContext, Fragment, useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import PasswordForm from '../../shared/components/FormElements/PasswordForm';
import AuthContext from '../../context/auth/authContext';

import './UserItem.css';

const UserItem = props => {
  const { user } = props;
  const authContext = useContext(AuthContext);

  const { token, banUser } = authContext;
  const [openPassWordForm, setOpenPassWordForm ] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    password: ''
  });

  const onBanUser = e => {
    e.preventDefault();
    banUser(user._id , token, passwordForm.password);
  }

  return (
    <Fragment>
      <div className="user-item">
        <div className="user-item__infos">
          <span className="user-item__username">{user.username}</span>
          <span className="user-item__email">{user.email}</span>
          <span className="user-item__role">{user.role}</span>
          <span className="user-item__status">{user.status}</span>
        </div>
        <div className="user-item__actions">
          <Button type={'button'}>Change Role</Button>
          <Button type={'button'} onClick={() => setOpenPassWordForm(true)}>Ban</Button>
        </div>
      </div>
      {
        openPassWordForm && (
          <PasswordForm 
            onSubmit={onBanUser}
            onCancel={() => setOpenPassWordForm(false)}
            onChange={e => setPasswordForm({...passwordForm, password: e.target.value})}
            value={passwordForm.password}
          />
        )
      }
    </Fragment>
  )
}

export default UserItem
