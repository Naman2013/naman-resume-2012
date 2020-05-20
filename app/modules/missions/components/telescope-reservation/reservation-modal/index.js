import React, { Component } from 'react';
import { Modal } from 'app/components/modal';
import ReservationModalContent from '../../../containers/reservation-modal-content';

export class ReservationModal extends Component {
  render() {
    const {
      onHide,
      onComplete,
      show,
      pageSetup,
      navigationConfig,
      editCoordinates,
      showHoldOneHourButtonWhenExpanded,
      timestamp,
      currenttime,
    } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        goBackText={navigationConfig.goBackLinkText}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ReservationModalContent
          onHide={onHide}
          onComplete={onComplete}
          pageSetup={pageSetup}
          navigationConfig={navigationConfig}
          editCoordinates={editCoordinates}
          showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
          timestamp={timestamp}
          currenttime={currenttime}
        />
      </Modal>
    );
  }
}
