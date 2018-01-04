import React from 'react';
import PropTypes from 'prop-types';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';

function CountdownTimer({ missionStartTime }) {
  return (
    <div className="count-down">
      <h4 className="counter-text clearfix">
        <span className="countdown-pre-text">~</span> <InlineCountdown startTime={missionStartTime} />
      </h4>

      <style jsx>{`
        .counter-text {
          font-size: 10px;
        }

        .countdown-pre-text {
          float: left;
        }
      `}</style>
    </div>
  );
}

CountdownTimer.propTypes = {
  missionStartTime: PropTypes.number.isRequired,
};


export default CountdownTimer;
