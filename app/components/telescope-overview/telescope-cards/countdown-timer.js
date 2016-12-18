import React, { Component, PropTypes } from 'react';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';
import moment from 'moment';

class CountdownTimer extends Component {
  render() {
    return(
      <div className="count-down">
        <h4 className="counter-text">
          <InlineCountdown startTime={this.props.missionStartTime} />
        </h4>
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  missionStartTime: PropTypes.number
};

export default CountdownTimer;
