import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import { WriteObservationStep1 } from '../write-observation-step1';

export class WriteObservationModal extends Component {
  render() {
    const { onHide, show, getMyPictures } = this.props;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        <WriteObservationStep1 getMyPictures={getMyPictures} />
      </Modal>
    );
  }
}
