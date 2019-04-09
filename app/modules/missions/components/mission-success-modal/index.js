import RecommendedQuestSliderItem from 'app/components/common/RecommendedQuestsSlider/partials/RecommendedQuestItem';
import GuideTile from 'app/components/common/tiles/guide-tile';
import StoryTile from 'app/components/common/tiles/StoryTile';
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
      <Modal show={show} onHide={onHide}>
        <div className="modal-wrapper">
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

          <div className="row">
            <div className="col-sm-6">
              <RecommendedQuestSliderItem />
            </div>
            <div className="col-sm-6">
              <RecommendedQuestSliderItem />
            </div>
          </div>

          <h3 className="modal-h3">
            Get Inspired about this Object by reading these stories
          </h3>

          <div className="row">
            <div className="col-sm-6">
              <StoryTile {...relatedStory} />
            </div>
            <div className="col-sm-6">
              <StoryTile {...relatedStory} />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
