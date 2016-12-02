import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';

class AvailableMission extends Component {
  render() {

    const containerClassnames = classnames({
      'telescope-listings-item-inline-reservation': 1,
      'available': 1,
      'expanded': 1,
    });

    return(
      <li className={containerClassnames}>

        <div className="above-the-fold-content clearfix">

          <div className="close-button">
            <button className="action">
              <span className="fa fa-close"></span>
            </button>
          </div>

          <div className="col-xs-2">
            <MissionTime />
          </div>

          <div className="col-xs-4 slot-description">
            <img className="slot-logo" src="assets/icons/alien-head.png" height="40" alt=""/>
            <span className="slot-name">This slot could be yours.</span>
          </div>

          <div className="col-xs-6 reservation-options-content">
            <ul className="reservation-options">
              <li className="option">
                <button className="action">Browser objects</button>
              </li>
              <li className="option">
                <button className="action">Select by catelog #</button>
              </li>
              <li className="option">
                <button className="action">Enter coordinate</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-line"></div>

        <div className="reservation-form-container">

          <div className="timer-container">
            <h5 className="timer">
              <span className="fa fa-clock-o"></span> Please complete your reservation form within 04:47
            </h5>
          </div>

          <div className="form">
            <h3 className="title">Select Category</h3>
          </div>

        </div>

      </li>
    );
  }
}

export default AvailableMission;
