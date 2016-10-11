import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CountdownTimer from './countdown-timer';
import ThumbnailImageLoader from '../../common/telescope-image-loader/thumbnail-image-loader';
import TelescopeOffline from './telescope-offline';
import style from './card-front.scss';

import moment from 'moment';

const MISSION_READY_TELE_ACCESS_METHOD = 'missions';

class CardFront extends Component {

  renderVisitTelescopeButton() {
    return(
      <div className="col-md-6">
        <Link to="telescope-details" className="action">
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
    const { teleSystem, telePort } = this.props;
    return `/sse/${teleSystem}`;
  }

  render() {

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
            { this.renderVisitTelescopeButton() }
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
                    <ThumbnailImageLoader
                      imageSource={this.generateSseImageSource()}
                      teleId={this.props.teleId}
                      teleFade={this.props.teleFade}
                      teleThumbWidth={this.props.teleThumbWidth} />
                  </div>

                  <h5 className="telescope-image-title">
                    Andromeda Galaxy ( M31 )
                  </h5>
                </div>
              </div>

              :

              <TelescopeOffline
                offlineImage={this.props.teleOfflineImgURL}
                offlineStatusMessage={`The weather is a bit intense right now so all missions have been cancelled.`} />

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
};

export default CardFront;
