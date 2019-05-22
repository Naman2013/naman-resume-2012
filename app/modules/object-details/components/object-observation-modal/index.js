import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import ObjectObservationModalContainer from '../../containers/object-observation-modal';

export class ObjectObservationModal extends Component {
  render() {
    const { onHide, show } = this.props;

    return (
      <Modal show={show} onHide={onHide} goBackText="EXIT">
        <ObjectObservationModalContainer onHide={onHide} />
      </Modal>
    );
  }
}
