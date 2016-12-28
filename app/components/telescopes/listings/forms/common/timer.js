import React, { PropTypes } from 'react';
import InlineCountdown from '../../../../common/inline-countdown/inline-countdown';

const Timer = ({startTime, expireCallback}) => (
  <div className="timer-container">
    <h5 className="timer">
      <span className="fa fa-clock-o"></span> Please complete your reservation form within <InlineCountdown startTime={startTime} exitAction={expireCallback} />
    </h5>
  </div>
);

export default Timer;
