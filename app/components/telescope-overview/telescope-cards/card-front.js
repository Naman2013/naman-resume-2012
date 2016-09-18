import React, { Component, PropTypes } from 'react';
import CountdownTimer from './countdown-timer';
import style from './card-front.scss';


import moment from 'moment';

class CardFront extends Component {
  render() {
    return(
      <div className="telescope-card-front">
        <div className="card-header">
          <button
            onClick={this.props.handleFlip}
            className="flip-card-action">
            <img src="../../../assets/icons/flip-arrow.svg" />
          </button>

          <img src="../../../assets/icons/observatory.svg" width="50" height="50" />
          <h3 className="title">High-Magnification 1</h3>
          <p className="body">
            Best for Deep Sky Objects such as galaxies, nebulae, and star clusters.
          </p>

          <div className="call-to-action clearfix">
            <div className="col-md-6">
              <a className="action" href="">Visit Telescope Page</a>
            </div>
            <div className="col-md-6">
              <a className="action" href="">Make Reservation</a>
            </div>
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
                    <img src="../../../assets/images/graphics/galaxy-circle.png" width="245" height="245" />
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
                    <img src="../../../assets/images/graphics/telescope-offline.png" width="245" height="245" />
                  </div>
                  <p className="telescope-status">
                    The weather is a bit intense right now so all mission have been cancelled unfortunately.
                  </p>
                </div>
              </div>
          }


          <div className="sponsor">
            <p>Sponsored by: <img src="../../../assets/images/logos/celestron.png" width="150" /></p>
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
  handleFlip: PropTypes.func,
  telescopeOnline: PropTypes.bool
};

export default CardFront;
