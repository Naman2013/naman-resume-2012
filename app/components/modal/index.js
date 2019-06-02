// @flow

import * as React from 'react';
import { Modal as BModal } from 'react-bootstrap';
import './styles.scss';
import cx from 'classnames';

type TModalDialog = {
  children?: React.Node,
  onHide: Function,
  goBackText: string,
  mobileGoBackText: string,
};

const ModalDialog = (props: TModalDialog) => {
  const { children, onHide, goBackText, mobileGoBackText } = props;

  const backClick = e => {
    e.preventDefault();
    return onHide();
  };

  return (
    <div className="custom-modal">
      <span role="presentation" className="modal-back-btn" onClick={backClick}>
        <span className="d-sm-none">
          <span className="icon icon-arrow-left" />{' '}
          {mobileGoBackText || 'GO BACK'}
        </span>
        <span className="d-none d-sm-block">
          <span className="icon icon-arrow-left" /> {goBackText || 'GO BACK'}
        </span>
      </span>

      <div className="container">{children}</div>
    </div>
  );
};

type TModal = {
  children?: React.Node,
  mobileStyle?: boolean,
  onHide: Function,
  goBackText?: string,
  mobileGoBackText?: string,
  show: boolean,
};

export const Modal = (props: TModal) => {
  const { children, mobileStyle, customClass } = props;
  const cls = cx({ 'mobile-style': mobileStyle }, customClass);
  return (
    <BModal
      {...props}
      dialogAs={() => <ModalDialog {...props} />}
      backdrop="static"
      backdropClassName={`custom-modal-backdrop ${customClass || ''}`}
      className={cls}
    >
      {children}
    </BModal>
  );
};
