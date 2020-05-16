import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './ImageToReview.css';

const ImageToReview = props => {
  const { image } = props;
  return (
    <div className="image-review-item">
      <div className="image-review-item__image">
        <img src={image.image} alt="to review" />
      </div>
      <div className="image-review-item__actions">
        <Button type={'button'}>Approve</Button>
        <Button type={'button'}>Ban user</Button>
      </div>
    </div>
  )
}

export default ImageToReview
