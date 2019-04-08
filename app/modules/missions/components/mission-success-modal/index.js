import { Modal } from 'app/components/modal';
import { AvailbleMissionTile } from 'app/modules/missions/components/available-mission-tile';
import React, { Component } from 'react';
import './styles.scss';

export class MissionSuccessModal extends Component {
  render() {
    const { onHide, show, reservedMissionData, missionSlot } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h1 className="modal-h">{reservedMissionData.title}</h1>
        <p className="modal-p">{reservedMissionData.explanation}</p>
        <p className="modal-p">{reservedMissionData.tip}</p>
        <AvailbleMissionTile missionSlot={missionSlot} />
      </Modal>
    );
  }
}
