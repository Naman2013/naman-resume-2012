import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import ObjectObservationModal from '../../containers/object-observation-modal';

export class WriteObservationModal extends Component {
  render() {
    const { onHide, show } = this.props;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        <ObjectObservationModal />
      </Modal>
    );
  }
}
