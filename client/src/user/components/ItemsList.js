import React from 'react';

import UserItem from './UserItem';
import ImageToReview from './ImageToReview';

import './ItemsList.css';

const ItemsList = () => {
  return (
    <div className="users-list">
{/*       <UserItem />
      <UserItem />
      <UserItem />
      <UserItem /> */}
      <ImageToReview />
      <ImageToReview />
      <ImageToReview />
      <ImageToReview />
    </div>
  )
}

export default ItemsList
