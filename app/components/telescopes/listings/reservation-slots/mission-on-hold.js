import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';

class MissionOnHold extends Component {
  render() {
    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'on-hold': 1,
    });

    const timer = '44:42';

    return(
      <li className={containerClassnames}>

        <div className="col-xs-2">
          <MissionTime />
        </div>

        <div className="col-md-4 slot-description">
          <img className="slot-logo" src="assets/icons/question-mark.png" width="38" alt=""/>
          <span className="slot-name">On Hold. Object Not Yet Set.</span>
        </div>

        <div className="col-xs-4 reserved-by-user-content">
          <h3 className="title">Reserved by:</h3>
          <ByUserTag
            theme={`light`}
            photo={`http://images-account.slooh.com/avatar-dummy.png`}
            name={`John`}
            accountType={`astronomer`}
            city={`Millwood`}
            state={`New York`}
            country={`USA`}
            memberSince={`2016`}
          />
        </div>

        <div className="col-xs-2 hold-timer-content">
          <h5 className="hold-timer">{timer}</h5>
          <p className="title">Hold time remaining.</p>
        </div>

      </li>
    );
  }
}

export default MissionOnHold;
