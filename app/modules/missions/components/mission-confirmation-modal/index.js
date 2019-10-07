import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'app/components/modal';
import './styles.scss';

export class MissionConfirmationModal extends PureComponent {
  render() {
    const { onHide, onConfirm, show, confirmationPrompt } = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <div className="modal-wrapper mission-confirmation-modal">
          <h1 className="modal-h">{confirmationPrompt}</h1>

          <Button onClick={onConfirm} className="modal-btn">
            Yes
          </Button>
          <Button onClick={onHide} className="modal-btn">
            No
          </Button>
        </div>
      </Modal>
    );
  }
}
