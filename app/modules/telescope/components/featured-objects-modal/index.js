import React, { Component } from 'react';
import { Modal } from 'app/components/modal';
import { AvailbleMissionTile } from 'app/modules/missions/components/available-mission-tile';
import './styles.scss';

export class FeaturedObjectsModal extends Component {
  render() {
    const {
      onHide,
      show,
      selectedMission,
      user,
      onMissionView,
      piggyback,
    } = this.props;

    const {
      popupHeader,
      popupSubheader,
      goBackLinkText,
      tip,
      objectIconURL,
    } = selectedMission;
    
    return (
      <Modal show={show} onHide={onHide} goBackText={goBackLinkText}>
        <div className="modal-wrapper featured-objects-modal">
          <h1 className="modal-h">{popupHeader}</h1>
          <p className="modal-p">{popupSubheader}</p>
          <AvailbleMissionTile
            missionSlot={selectedMission}
            objectIconURL={objectIconURL}
            user={user}
            tip={tip}
            onMissionView={onMissionView}
            piggyback={piggyback}
            communityMissions
          />
        </div>
      </Modal>
    );
  }
}
