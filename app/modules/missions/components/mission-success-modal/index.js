import RecommendedQuestSliderItem from 'app/components/common/RecommendedQuestsSlider/partials/RecommendedQuestItem';
import GenericButton from 'app/components/common/style/buttons/Button';
import GuideTile from 'app/components/common/tiles/guide-tile';
import LailaTile from 'app/components/common/tiles/LailaTile';
import { Modal } from 'app/components/modal';
import ObjectRelatedTile from 'app/containers/object-details/ObjectRelatedTile';
import { AvailbleMissionTile } from 'app/modules/missions/components/available-mission-tile';
import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import './styles.scss';

export class MissionSuccessModal extends Component {
  render() {
    const {
      onHide,
      show,
      reservedMissionData,
      missionSlot,
      reservedMission = {},
    } = this.props;

    const {
      hasRelatedQuests,
      showGoodiesHeader,
      goodiesHeader,
      goBackLinkText,
      exitLinkText,
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
          <AvailbleMissionTile
            missionSlot={missionSlot}
            tip={reservedMissionData.tip}
          />

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
                  <ObjectRelatedTile
                    {...relatedStory}
                    showDescription={false}
                  />
                </div>
              </div>
            </Fragment>
          )}

          {hasRelatedShow && (
            <div className="mt-3">
              <ObjectRelatedTile
                {...relatedShow}
                additionalContent={
                  <div
                    role="presentation"
                    className="related-show"
                    onClick={() => browserHistory.push(relatedShow.linkUrl)}
                  >
                    <p className="related-show-title">
                      {relatedShow.imageTitle}{' '}
                    </p>
                    <GenericButton
                      theme={{ margin: '0 auto' }}
                      renderIcon={() => (
                        <img src="https://vega.slooh.com/assets/v4/icons/play_icon.svg" />
                      )}
                    />
                  </div>
                }
              />
            </div>
          )}

          <div className="text-center mt-3">
            <Button onClick={onHide}>{finishedButtonCaption}</Button>
          </div>
        </div>
      </Modal>
    );
  }
}
