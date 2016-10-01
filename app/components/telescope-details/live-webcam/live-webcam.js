import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './live-webcam.scss';

import Progress from 'react-progressbar';

class LiveWebcam extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return(
      <div className="telescope-block live-webcam">
        <div className="top">
          <h3>Canary Islands Observatories LIVE Webcam</h3>
          <p>Use the navigation below to change the view to a different direction.</p>
          <img className="topLogo" src={'/assets/images/graphics/logo-iac.png'} />
        </div>
        <div className="live-webcam-feed">
          <img src={'/assets/images/graphics/livecam-placeholder.jpg'} />
          <div className="live-feed-footer">
            <div className="row">
              <div className="col-md-6">
                17 / 09 / 2016    23:20:00
              </div>
              <div className="col-md-6 feed-controls">
                <button className="active">West</button>
                <button>East</button>
                <button>South</button>
                <button>North</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveWebcam;
