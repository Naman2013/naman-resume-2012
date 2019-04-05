import React from 'react';
import { Modal as BModal } from 'react-bootstrap';
import './styles.scss';

const ModalDialog = props => {
  const { children, onHide } = props;
  return (
    <div className="custom-modal">
      <span
        role="presentation"
        className="modal-back-btn"
        onClick={e => {
          e.preventDefault();
          onHide();
        }}
      >
        GO BACK
      </span>

      <div className="container">{children}</div>
    </div>
  );
};

export const Modal = props => {
  const { children } = props;
  return (
    <BModal
      {...props}
      dialogAs={() => <ModalDialog {...props} />}
      backdrop={false}
    >
      {children}
    </BModal>
  );
};
