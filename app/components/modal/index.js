import React from 'react';
import { Modal as BModal } from 'react-bootstrap';
import './styles.scss';

const ModalDialog = props => {
  const { children, onHide, goBackText } = props;

  const backClick = e => {
    e.preventDefault();
    return onHide();
  };

  return (
    <div className="custom-modal">
      <span role="presentation" className="modal-back-btn" onClick={backClick}>
        <span className="icon icon-arrow-left" />
        {goBackText || 'GO BACK'}
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
