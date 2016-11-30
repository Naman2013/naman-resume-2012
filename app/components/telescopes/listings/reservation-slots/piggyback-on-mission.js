import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';

class PiggybackOnMission extends Component {
  render() {

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'reserved': 1,
    });

    return(
      <div className={containerClassnames}>

        <MissionTime />

      </div>
    );
  }
}

export default PiggybackOnMission;
