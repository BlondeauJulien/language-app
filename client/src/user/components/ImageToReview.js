import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './ImageToReview.css';

const ImageToReview = () => {
  return (
    <div className="image-review-item">
      <div className="image-review-item__image">
        <img src="https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/forrest-gump-pluson.jpg" alt="to review" />
      </div>
      <div className="image-review-item__actions">
        <Button type={'button'}>Approve</Button>
        <Button type={'button'}>Ban user</Button>
      </div>
    </div>
  )
}

export default ImageToReview
