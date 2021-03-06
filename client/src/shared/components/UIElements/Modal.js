import React, { Fragment, useEffect } from 'react';
import ReactDom from 'react-dom';

import Button from '../FormElements/Button';

import './Modal.css';

export const Modal = props => {
  const { onClose } = props;

  useEffect(() => {
    document.addEventListener('click', onCloseModal);
    document.addEventListener('click', onCloseModal);

    return () => {
      document.removeEventListener('click', onCloseModal);
      document.removeEventListener('click', onCloseModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
