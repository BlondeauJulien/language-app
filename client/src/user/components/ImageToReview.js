import React, { useContext, Fragment, useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import PasswordForm from '../../shared/components/FormElements/PasswordForm';
import AuthContext from '../../context/auth/authContext';

import './ImageToReview.css';

const ImageToReview = props => {
  const { image } = props;
  const authContext = useContext(AuthContext);

  const { token, approveQuizImage, banUser } = authContext;
  const [openDeleteForm, setOpenDeleteForm ] = useState(false);
  const [deleteForm, setDeleteForm] = useState({
    password: ''
  });

  const onApprouveImage = () => {
    approveQuizImage(image._id, token);
  }

  const onBanUser = e => {
    e.preventDefault();
    banUser(null , token, deleteForm.password, image.course, image._id);
  }

  return (
    <Fragment>
      <div className="image-review-item">
        <div className="image-review-item__image">
          <img src={image.image} alt="to review" />
        </div>
        <div className="image-review-item__actions">
          <Button type={'button'} onClick={onApprouveImage}>Approve</Button>
          <Button type={'button'} onClick={() => setOpenDeleteForm(true)}>Ban user</Button>
        </div>
      </div>
      <div>
        {openDeleteForm && (
          <PasswordForm 
            onSubmit={onBanUser}
            onCancel={() => setOpenDeleteForm(false)}
            onChange={e => setDeleteForm({...deleteForm, password: e.target.value})}
            value={deleteForm.password}
          />
        )}
      </div>
    </Fragment>
  )
}

export default ImageToReview
