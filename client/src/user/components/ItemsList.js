import React from 'react';

import UserItem from './UserItem';
import ImageToReview from './ImageToReview';

import './ItemsList.css';

const ItemsList = props => {
  const { itemsFor, items} = props;
  return (
    <div className="users-list">
      {
        items.map((item, i) => {
          if(itemsFor === 'users') {
            return <UserItem key={item._id} user={item}/>
          }
          if(itemsFor === 'review') {
            return <ImageToReview key={item._id} image={item}/>
          }
        })
      }
    </div>
  )
}

export default ItemsList
