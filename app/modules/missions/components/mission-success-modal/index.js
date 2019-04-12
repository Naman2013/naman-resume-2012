import RecommendedQuestSliderItem from 'app/components/common/RecommendedQuestsSlider/partials/RecommendedQuestItem';
import BigShowTile from 'app/components/common/tiles/BigShowTile';
import GuideTile from 'app/components/common/tiles/guide-tile';
import LailaTile from 'app/components/common/tiles/LailaTile';
import StoryTile from 'app/components/common/tiles/StoryTile';
import { Modal } from 'app/components/modal';
import ObjectRelatedTile from 'app/containers/object-details/ObjectRelatedTile';
import { AvailbleMissionTile } from 'app/modules/missions/components/available-mission-tile';
import React, { Component, Fragment } from 'react';
import './styles.scss';
import { Button } from 'react-bootstrap';

export class MissionSuccessModal extends Component {
  render() {
    const {
      onHide,
      show,
      reservedMissionData,
      missionSlot,
      reservedMission,
    } = this.props;

    const {
      hasRelatedQuests,
      showGoodiesHeader,
      goodiesHeader,
      goBackLinkText,
      finishedButtonCaption,
      confirmationHeader,
      congratulationsText,
      hasRelatedGuide,
      relatedGuide = {},
      hasRelatedObject,
      relatedObject = {},
      hasRelatedShow,
      relatedShow = {},
      hasRelatedStory,
      relatedStory = {},
    } = reservedMission;

    return (
      <Modal show={show} onHide={onHide} goBackText={goBackLinkText}>
        <div className="modal-wrapper">
          <h1 className="modal-h">{confirmationHeader}</h1>
          <p className="modal-p">{congratulationsText}</p>
          <p className="modal-p">{reservedMissionData.tip}</p>
          <AvailbleMissionTile missionSlot={missionSlot} />

          {showGoodiesHeader && <h2 className="modal-h2">{goodiesHeader}</h2>}

          {hasRelatedGuide && (
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
          )}

          <br />

          {hasRelatedObject && (
            <ObjectRelatedTile
              {...relatedObject}
              additionalContent={
                <LailaTile
                  iconURL={relatedObject.iconUrl}
                  title={relatedObject.imageTitle}
                  linkURL={relatedObject.linkUrl}
                />
              }
            />
          )}

          {hasRelatedQuests && (
            <Fragment>
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
            </Fragment>
          )}

          {hasRelatedStory && (
            <Fragment>
              <h3 className="modal-h3">
                Get Inspired about this Object by reading these stories
              </h3>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <StoryTile {...relatedStory} />
                </div>
              </div>
            </Fragment>
          )}

          {/*{hasRelatedShow && <BigShowTile {...relatedShow} />}*/}

          <div className="text-center">
            <Button onClick={onHide}>{finishedButtonCaption}</Button>
          </div>
        </div>
      </Modal>
    );
  }
}
