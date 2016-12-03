import React from 'react';

import InlineCountdown from '../../../../common/inline-countdown/inline-countdown';

const Timer = ({startTime}) => (
  <div className="timer-container">
    <h5 className="timer">
      <span className="fa fa-clock-o"></span> Please complete your reservation form within 04:47
    </h5>
  </div>
);

export default Timer;
