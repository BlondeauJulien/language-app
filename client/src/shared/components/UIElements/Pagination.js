import React from 'react';

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
        <a onClick={() => paginate(1)} href="#main-cont"><li className='pagination-item'>
          <i className="fas fa-step-backward"></i></li>
        </a>
        {pageNumbers.map(number => (
          <a key={number}  onClick={() => paginate(number)} href="#main-cont">
            <li className={currentPage === number ? 'pagination-item pagination-item-current' : "pagination-item"}>  
              {number} 
            </li>
          </a>
        ))}
        <a onClick={() => paginate(Math.ceil(totalItems / postsPerPage))} href="#main-cont">
          <li className='pagination-item'><i className="fas fa-step-forward"></i></li>
        </a>
      </ul>
    </nav>
  );
};

export default Pagination;