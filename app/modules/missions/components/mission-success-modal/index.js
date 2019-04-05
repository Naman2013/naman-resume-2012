import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import './styles.scss';

export class MissionSuccessModal extends Component {
  render() {
    const { onHide, show, reservedMissionData } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h1 className="modal-h">Set Up a Mission on Canary One at 16:40 UTC</h1>
        <h1 className="modal-h">{reservedMissionData.title}</h1>
        <p className="modal-p">
          Set up a Mission using the Slooh Recommender, by Catalog, or by
          Coordinates. One credit is required to schedule your own Mission.{' '}
        </p>
        <p className="modal-p">{reservedMissionData.explanation}</p>
      </Modal>
    );
  }
}
