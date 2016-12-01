import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';

class AvailableMission extends Component {
  render() {

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'available': 1,
    });

    return(
      <li className={containerClassnames}>
        <div className="col-xs-2">
          <MissionTime />
        </div>

        <div className="col-xs-4 slot-description">
          <img className="slot-logo" src="assets/icons/alien-head.png" width="38" alt=""/>
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

      </li>
    );
  }
}

export default AvailableMission;
