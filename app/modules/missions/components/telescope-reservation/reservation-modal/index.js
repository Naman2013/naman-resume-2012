import React, { Component } from 'react';
import { Modal } from 'app/components/modal';
import ReservationModalContent from '../../../containers/reservation-modal-content';

export class ReservationModal extends Component {
  render() {
    const { onHide, onComplete, show, pageSetup } = this.props;
    const { navigationConfig } = pageSetup;
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        goBackText={navigationConfig[3].goBackLinkText}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ReservationModalContent
          onHide={onHide}
          onComplete={onComplete}
          pageSetup={pageSetup}
        />
      </Modal>
    );
  }
}
