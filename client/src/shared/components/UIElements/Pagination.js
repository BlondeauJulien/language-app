import React, { Fragment } from 'react';

import './Pagination.css';

const Pagination = props => {
  const { postsPerPage, currentPage, totalItems, paginate } = props;
  const pageNumbers = [];
  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if(i > 0 && i <= Math.ceil(totalItems / postsPerPage)) {
      pageNumbers.push(i);
    }
  }

  return (
    <nav>
      <ul className='pagination'>
        {
          pageNumbers[0] !== 1 && (
            <Fragment>
              <a onClick={() => paginate(1)} href="#main-cont">
                <li className='pagination-item'>1</li>
              </a>
              <li><span className='paginate-filler-item'>...</span></li>
            </Fragment>
          )
        }
        {pageNumbers.map(number => (
          <a key={number}  onClick={() => paginate(number)} href="#main-cont">
            <li className={currentPage === number ? 'pagination-item pagination-item-current' : "pagination-item"}>  
              {number} 
            </li>
          </a>
        ))}
        {
          pageNumbers[pageNumbers.length -1] !== Math.ceil(totalItems / postsPerPage) && (
            <Fragment>
              <li><span className='paginate-filler-item'>...</span></li>
              <a onClick={() => paginate(Math.ceil(totalItems / postsPerPage))} href="#main-cont">
                <li className='pagination-item'>{Math.ceil(totalItems / postsPerPage)}</li>
              </a>
            </Fragment>
          )
        }
      </ul>
    </nav>
  );
};

export default Pagination;