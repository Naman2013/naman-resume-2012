import React, { Component, PropTypes } from 'react';
import CountdownTimer from './countdown-timer';
import style from './card-front.scss';


import moment from 'moment';

class CardFront extends Component {

  renderVisitTelescopeButton() {
    return(
      this.props.teleHasTelescopePage ?
        <div className="col-md-6">
          <a className="action" href="">Visit Telescope Page</a>
        </div> : null
    );
  }

  renderMakeReservationButton() {
    return(
      this.props.teleAccessMethod === 'mission' ?
        <div className="col-md-6">
          <a className="action" href="">Make Reservation</a>
        </div> : null
    );
  }

  render() {
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
                <CountdownTimer
                  missionStartTime={this.props.missionStartTime} />

                <div className="image-viewer">
                  <h4 className="title">LIVE Mission</h4>
                  <div className="telescope-image">
                    <img src="assets/images/graphics/galaxy-circle.png" width="245" height="245" />
                  </div>
                  <h5 className="telescope-image-title">
                    Andromeda Galaxy ( M31 )
                  </h5>
                </div>
              </div>

              :

              <div>

                <div className="image-viewer">
                  <div className="count-down">
                    <h4 className="counter-text">3:18</h4>
                  </div>

                  <h4 className="title">Offline</h4>
                  <div className="telescope-image">
                    <img src={this.props.teleOfflineImgURL} width="245" height="245" />
                  </div>
                  <p className="telescope-status">
                    The weather is a bit intense right now so all missions have been cancelled.
                  </p>
                </div>
              </div>
          }

          <div className="sponsor">
            {
              !!this.props.teleSponsorLinkURL ?
              <p>
                Sponsored by: <a target="_blank" href={this.props.teleSponsorLinkURL}><img src={this.props.teleSponsorLogoURL} width="150" /></a>
              </p>
              :
              null
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
  teleTelescopeUsage: PropTypes.string,
  teleLogoURL: PropTypes.string,
  teleOfflineImgURL: PropTypes.string,
  teleOnlineStatus: PropTypes.string,
  teleSponsorLinkURL: PropTypes.string,
  teleSponsorLogoURL: PropTypes.string,
  handleFlip: PropTypes.func,
  telescopeOnline: PropTypes.bool,
  teleAccessMethod: PropTypes.string,
  teleHasTelescopePage: PropTypes.bool,
};

export default CardFront;
