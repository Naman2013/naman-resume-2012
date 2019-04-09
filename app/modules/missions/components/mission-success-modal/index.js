import GuideTile from 'app/components/common/tiles/guide-tile';
import { Modal } from 'app/components/modal';
import ObjectRelatedTile from 'app/containers/object-details/ObjectRelatedTile';
import { AvailbleMissionTile } from 'app/modules/missions/components/available-mission-tile';
import React, { Component } from 'react';
import './styles.scss';

export class MissionSuccessModal extends Component {
  render() {
    const {
      onHide,
      show,
      reservedMissionData,
      missionSlot,
      // temp
      tempObjDetails,
    } = this.props;

    const {
      relatedGuide = {},
      relatedObject = {},
      relatedShow = {},
      relatedStory = {},
    } = tempObjDetails;

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

        <h2 className="modal-h2">
          Here are some goodies to help you before your Mission!
        </h2>

        <ObjectRelatedTile
          {...relatedGuide}
          showMobileAdditionalContent
          additionalContent={
            <GuideTile
              title={relatedGuide.imageLabel}
              subTitle={relatedGuide.imageTitle}
              linkUrl={relatedGuide.linkUrl}
            />
          }
        />

        <h3 className="modal-h3">
          Add to these Quests by attending this Mission!
        </h3>
      </Modal>
    );
  }
}
