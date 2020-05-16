import React, { useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import AuthContext from '../../context/auth/authContext';

import './ImageToReview.css';

const ImageToReview = props => {
  const { image } = props;
  const authContext = useContext(AuthContext);

  const { token, approveQuizImage } = authContext;

  const onApprouveImage = () => {
    approveQuizImage(image._id, token);
  }

  return (
    <div className="image-review-item">
      <div className="image-review-item__image">
        <img src={image.image} alt="to review" />
      </div>
      <div className="image-review-item__actions">
        <Button type={'button'} onClick={onApprouveImage}>Approve</Button>
        <Button type={'button'}>Ban user</Button>
      </div>
    </div>
  )
}

export default ImageToReview
