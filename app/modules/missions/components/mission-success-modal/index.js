import GenericButton from 'app/components/common/style/buttons/Button';
import GuideTile from 'app/components/common/tiles/guide-tile';
import LailaTile from 'app/components/common/tiles/LailaTile';
import { Modal } from 'app/components/modal';
import ObjectRelatedTile from 'app/containers/object-details/ObjectRelatedTile';
import { AvailbleMissionTile } from 'app/modules/missions/components/available-mission-tile';
import React, { Component } from 'react';
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
      <Modal
        show={show}
        onHide={onHide}
        goBackText={goBackLinkText}
        mobileGoBackText={exitLinkText}
        mobileStyle
      >
        <div className="modal-wrapper">
          <h1 className="modal-h">{confirmationHeader}</h1>
          <p className="modal-p my-5">{congratulationsText}</p>
          <AvailbleMissionTile
            missionSlot={missionSlot}
            tip={reservedMissionData.tip}
          />

          <div className="dark-text-after-me-in-mobile" />

          {showGoodiesHeader && (
            <h2 className="modal-h2 my-5">{goodiesHeader}</h2>
          )}

          {hasRelatedGuide && (
            <>
              <h3 className="modal-h3 my-5">{relatedObject.header}</h3>
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
            </>
          )}

          {hasRelatedObject && (
            <>
              <h3 className="modal-h3 my-5">{relatedObject.header}</h3>
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
            </>
          )}

          {hasRelatedStory && (
            <>
              <h3 className="modal-h3 my-5">{relatedStory.header}</h3>
              <div className="row">
                <div className="col-sm-12">
                  <ObjectRelatedTile
                    {...relatedStory}
                    showDescription={false}
                  />
                </div>
              </div>
            </>
          )}

          {hasRelatedShow && (
            <>
              <h3 className="modal-h3 my-5">{relatedShow.header}</h3>
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
            </>
          )}

          <div className="text-center mt-3">
            <Button onClick={onHide}>{finishedButtonCaption}</Button>
          </div>
        </div>
      </Modal>
    );
  }
}
