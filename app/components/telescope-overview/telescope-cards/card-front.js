import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CountdownTimer from './countdown-timer';
import ThumbnailImageLoader from '../../common/telescope-image-loader/thumbnail-image-loader';
import VideoImageLoader from '../../common/telescope-image-loader/video-image-loader';
import TelescopeOffline from './telescope-offline';
import style from './card-front.scss';

import moment from 'moment';

const MISSION_READY_TELE_ACCESS_METHOD = 'missions';

class CardFront extends Component {

  renderVisitTelescopeButton(obsUniqueId, teleUniqueId) {
    const telescopeDetailsUrl = `telescope-details/${obsUniqueId}/${teleUniqueId}`;
    return(
      <div className="col-md-6">
        <Link to={telescopeDetailsUrl} className="action">
          Visit Telescope Page
        </Link>
      </div>
    );
  }

  renderMakeReservationButton() {
    return(
      this.isMissionReadyTelescope() ?
        <div className="col-md-6">
          <a className="action" href="">Make Reservation</a>
        </div> : null
    );
  }

  isMissionReadyTelescope() {
    return this.props.teleAccessMethod === MISSION_READY_TELE_ACCESS_METHOD;
  }

  generateSseImageSource() {
    // TODO: the port number is a dynamic value?
    // for now referencing the /sse/*** context and using a proxy to a default port
    // see webpack.config devServer proxies
    // example https://mars.slooh.com:3004/sse/${teleSystem}
    const { teleSystem, telePort } = this.props;
    return `/dev-sse/:${telePort}/sse/${teleSystem}`;
  }

  determineLoaderType() {
    /*
      apply image source loader based
      on this.props.teleImageSourceType
      expecting video or SSE
    */
    const { teleImageSourceType } = this.props;

    if(teleImageSourceType === 'video') {
      const {
        teleStreamCode,
        teleStreamURL,
        teleStreamThumbnailVideoWidth,
        teleStreamThumbnailVideoHeight,
        teleStreamThumbnailQuality } = this.props;

      return(
        <VideoImageLoader
          teleStreamCode={teleStreamCode}
          teleStreamURL={teleStreamURL}
          teleStreamThumbnailVideoWidth={teleStreamThumbnailVideoWidth}
          teleStreamThumbnailVideoHeight={teleStreamThumbnailVideoHeight}
          teleStreamThumbnailQuality={teleStreamThumbnailQuality} />
      );
    } else if(teleImageSourceType === 'SSE') {
      return(
        <ThumbnailImageLoader
          imageSource={this.generateSseImageSource()}
          teleId={this.props.teleId}
          teleFade={this.props.teleFade}
          teleThumbWidth={this.props.teleThumbWidth} />
      );
    }
  }

  render() {

    const { obsUniqueId, teleUniqueId } = this.props;

    const missionStatusStyle = {
      opacity: this.isMissionReadyTelescope() ? 1 : 0,
    };

    return(
      <div className="telescope-card-front">
        <div className="card-header">
          <button
            onClick={this.props.handleFlip}
            className="flip-card-action">
            <img src="assets/icons/flip-arrow.svg" />
          </button>

          <img src="assets/icons/observatory.svg" width="50" height="50" />
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
            !!this.props.telescopeOnline ?
              <div>
                {
                  this.isMissionReadyTelescope() ?
                  <CountdownTimer
                    missionStartTime={this.props.missionStartTime} /> : null
                }
                <div className="image-viewer">
                  <h4 className="title" style={missionStatusStyle}>LIVE Mission</h4>

                  <div className="telescope-image">
                    {
                      this.determineLoaderType()
                    }
                  </div>

                  <h5 className="telescope-image-title">
                    Andromeda Galaxy ( M31 )
                  </h5>
                </div>
              </div>

              :

              <TelescopeOffline
                offlineImage={this.props.teleOfflineImgURL}
                offlineStatusMessage={this.props.alertText} />

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
  teleName: PropTypes.string,
  teleId: PropTypes.string,
  teleTelescopeUsage: PropTypes.string,
  teleThumbWidth: PropTypes.string,
  teleFade: PropTypes.string,
  teleLogoURL: PropTypes.string,
  teleOfflineImgURL: PropTypes.string,
  teleOnlineStatus: PropTypes.string,
  teleSponsorLinkURL: PropTypes.string,
  teleSponsorLogoURL: PropTypes.string,
  handleFlip: PropTypes.func,
  telescopeOnline: PropTypes.bool,
  teleAccessMethod: PropTypes.string,
  telePort: PropTypes.string,
  teleSystem: PropTypes.string,
  teleImageSourceType: PropTypes.string,
  teleStreamCode: PropTypes.string,
  teleStreamURL: PropTypes.string,
  teleStreamThumbnailVideoWidth: PropTypes.string,
  teleStreamThumbnailVideoHeight: PropTypes.string,
  teleStreamThumbnailQuality: PropTypes.string,
  teleUniqueId: PropTypes.string,
  obsUniqueId: PropTypes.string,
  alertText: PropTypes.string,
};

export default CardFront;
