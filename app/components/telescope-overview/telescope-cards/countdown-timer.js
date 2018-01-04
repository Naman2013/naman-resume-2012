import React from 'react';
import PropTypes from 'prop-types';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';

function CountdownTimer({ missionStartTime }) {
  return (
    <div className="count-down">
      <h4 className="counter-text">
        <InlineCountdown startTime={missionStartTime} />
      </h4>
    </div>
  );
}

CountdownTimer.propTypes = {
  missionStartTime: PropTypes.number.isRequired,
};

export default CountdownTimer;
