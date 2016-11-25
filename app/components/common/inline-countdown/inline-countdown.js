import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import style from './inline-countdown.scss';

class InlineCountdown extends Component {

  componentWillMount() {
    const { startTime } = this.props;

    const expires = moment( startTime * 1000 );
    const duration = expires.diff( moment() );
    const formattedDuration = moment( duration ).format('mm:ss');
  }

  render() {
    return(
      <div className="inline-countdown">
        4:48
      </div>
    );
  }
}

InlineCountdown.propTypes = {
  startTime: PropTypes.number, // works with unix timestamp
  exitAction: PropTypes.func, // called for you when timer expires
};

export default InlineCountdown;
