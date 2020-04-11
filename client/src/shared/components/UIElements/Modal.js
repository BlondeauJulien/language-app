import React, { Fragment } from 'react';
import ReactDom from 'react-dom';

import Button from '../FormElements/Button';

import './Modal.css';

export const Modal = props => {
  let modal = (
    <Fragment>
      <div className="modal__Overlay"></div>
      <div className="modal-container">
        <div className="modal">
          <div className="modal__close-cross">
            <Button type="button" design={'plain-text'}>
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
