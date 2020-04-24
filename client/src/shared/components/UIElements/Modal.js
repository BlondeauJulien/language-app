import React, { Fragment, useEffect } from 'react';
import ReactDom from 'react-dom';

import Button from '../FormElements/Button';

import './Modal.css';

export const Modal = props => {
  const { onClose } = props;

  useEffect(() => {
    document.querySelector('.modal__overlay').addEventListener('click', onCloseModal);
    document.querySelector('.modal-container').addEventListener('click', onCloseModal);

    return () => {
      document.querySelector('.modal__overlay').removeEventListener('click', onCloseModal);
      document.querySelector('.modal-container').removeEventListener('click', onCloseModal);
    }
  }, []);

  const onCloseModal = e => {
    const classList = e.target.classList
    if(classList.contains('modal__overlay') || classList.contains('modal-container')) {
      onClose();
    }
  }

  let modal = (
    <Fragment>
      <div className="modal__overlay"></div>
      <div className="modal-container">
        <div className="modal">
          <div className="modal__close-cross">
            <Button onClick={onClose} type="button" design={'plain-text'}>
              <i class="fas fa-times"></i>
            </Button>
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </div>
    </Fragment>
  );

  return ReactDom.createPortal(modal , document.getElementById('modal-hook'));
}

export default Modal;
