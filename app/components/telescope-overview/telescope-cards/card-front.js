import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import has from 'lodash/has';
import moment from 'moment-timezone';
import CountdownTimer from './countdown-timer';
import TelescopeImageLoader from '../../common/telescope-image-loader/telescope-image-loader';
import VideoImageLoader from '../../common/telescope-image-loader/video-image-loader';
import TelescopeOffline from './telescope-offline';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';
import './card-front.scss';
import generateSseImageSource from '../../../utils/generate-sse-image-source';

const MISSION_READY_TELE_ACCESS_METHOD = 'missions';

function validMissionExpireTime(unixStartTime, unixEndTime) {
  const MAX_MINUTES_ALLOWABLE = 10;
  const convertedTimestamp = unixStartTime * 1000;
  const convertedServerTimestamp = unixEndTime * 1000;

  const difference = moment(convertedTimestamp).diff(convertedServerTimestamp, 'minutes');

  if (difference <= 0 || difference >= MAX_MINUTES_ALLOWABLE) {
    return false;
  }

  return true;
}

class CardFront extends Component {
  determineLoaderType(teleSystem, telePort) {
    /*
      apply image source loader based
      on this.props.teleImageSourceType
      expecting video or SSE
    */
    const { teleImageSourceType, teleId } = this.props;
    const idSet = obsIdTeleIdDomeIdFromTeleId(teleId);

    if (teleImageSourceType === 'video') {
      const {
        teleStreamCode,
        teleStreamURL,
        teleStreamThumbnailVideoWidth,
        teleStreamThumbnailVideoHeight,
        teleStreamThumbnailQuality } = this.props;

      return (
        <VideoImageLoader
          teleStreamCode={teleStreamCode}
          teleStreamURL={teleStreamURL}
          teleStreamThumbnailVideoWidth={teleStreamThumbnailVideoWidth}
          teleStreamThumbnailVideoHeight={teleStreamThumbnailVideoHeight}
          teleStreamThumbnailQuality={teleStreamThumbnailQuality}
          clipped={true}
        />
      );
    } else if (teleImageSourceType === 'SSE') {
      return (
        <TelescopeImageLoader
          loadThumbnails={true}
          imageSource={generateSseImageSource(teleSystem)}
          teleId={idSet.teleId}
          obsId={idSet.obsId}
          domeId={idSet.domeId}
          teleFade={String(this.props.teleFade)}
          teleThumbWidth={this.props.teleThumbWidth}
          missionFormat="compact"
        />
      );
    } else {
      return null;
    }
  }

  renderMakeReservationButton() {
    const { obsUniqueId, teleUniqueId } = this.props
    const reservationLink = `/reservations/reserve-by-telescope/telescope/${obsUniqueId}/${teleUniqueId}`;
    return (
      this.isMissionReadyTelescope() ?
        <div className="col-md-6">
          <Link to={reservationLink} className="action">Make Reservation</Link>
        </div> : null
    );
  }

  isMissionReadyTelescope() {
    return this.props.teleAccessMethod === MISSION_READY_TELE_ACCESS_METHOD;
  }

  renderVisitTelescopeButton(obsUniqueId, teleUniqueId) {
    const telescopeDetailsUrl = `/telescope-details/${obsUniqueId}/${teleUniqueId}`;
    return (
      <div className="col-md-6">
        <Link to={telescopeDetailsUrl} className="action">
          Visit Telescope Page
        </Link>
      </div>
    );
  }

  render() {
    const {
      obsUniqueId,
      teleUniqueId,
      teleSystem,
      telePort,
      teleInstrumentList,
      activeMission } = this.props;

    const cardContent = {
      objectTitle: '',
      expires: null,
    };

    if (has(activeMission, 'activeMission.compact.missionList')) {
      Object.assign(cardContent, activeMission.activeMission.compact.missionList[0]);
    }

    const missionStatusStyle = {
      opacity: this.isMissionReadyTelescope() ? 1 : 0,
    };

    return (
      <div className="telescope-card-front">
        <div className="card-header">
          {
            /**
              TODO: deferred for future feature
            */
            <button
              onClick={this.props.handleFlip}
              className="flip-card-action"
            >
              <img alt="click to flip the card" src="https://vega.slooh.com/assets/icons/flip-arrow.svg" />
            </button>
          }

          <img alt="this is an observatory" className="icon" src="https://vega.slooh.com/assets/icons/observatory.svg" width="50" height="50" />
          <h3 className="title">{this.props.teleName}</h3>
          <p className="body">
            {this.props.teleTelescopeUsage}
          </p>

          <div className="call-to-action clearfix">
            { this.renderVisitTelescopeButton(obsUniqueId, teleUniqueId)}
            { this.renderMakeReservationButton() }
          </div>

        </div>

        <div className="card-body">

          { /* telescope content */
            this.props.telescopeOnline ?
              <div>
                {
                  this.isMissionReadyTelescope() &&
                  validMissionExpireTime(cardContent.expires, cardContent.startTime) ?
                    <CountdownTimer
                      missionStartTime={cardContent.expires}
                    /> : null
                }
                <div className="image-viewer">
                  <h4 className="title" style={missionStatusStyle}>LIVE Mission</h4>

                  <div className="telescope-image">
                    { this.determineLoaderType(teleSystem, telePort) }
                  </div>

                  <h5 className="telescope-image-title">
                    {cardContent.objectTitle}
                  </h5>
                </div>
              </div>
              :
              <TelescopeOffline
                offlineImage={this.props.teleOfflineImgURL}
                offlineStatusMessage={this.props.alertText}
              />

          }
         <div className="sponsor">
            {
              !!this.props.teleSponsorLinkURL ?
              <p>
                Sponsored by: <a target="_blank" href={this.props.teleSponsorLinkURL}><img src={this.props.teleSponsorLogoURL} width="150" /></a>
              </p> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

CardFront.defaultProps = {
  missionStartTime: moment.now()
};

CardFront.propTypes = {
  activeMission: PropTypes.object,
  teleName: PropTypes.string,
  teleId: PropTypes.string,
  teleTelescopeUsage: PropTypes.string,
  teleThumbWidth: PropTypes.number,
  teleFade: PropTypes.number,
  teleLogoURL: PropTypes.string,
  teleOfflineImgURL: PropTypes.string,
  teleOnlineStatus: PropTypes.string,
  teleSponsorLinkURL: PropTypes.string,
  teleSponsorLogoURL: PropTypes.string,
  handleFlip: PropTypes.func,
  telescopeOnline: PropTypes.bool,
  teleAccessMethod: PropTypes.string,
  telePort: PropTypes.number,
  teleSystem: PropTypes.string,
  teleImageSourceType: PropTypes.string,
  teleStreamCode: PropTypes.string,
  teleStreamURL: PropTypes.string,
  teleStreamThumbnailVideoWidth: PropTypes.number,
  teleStreamThumbnailVideoHeight: PropTypes.number,
  teleStreamThumbnailQuality: PropTypes.string,
  teleUniqueId: PropTypes.string,
  teleInstrumentList: PropTypes.array,
  obsUniqueId: PropTypes.string,
  alertText: PropTypes.string,
};

export default CardFront;
