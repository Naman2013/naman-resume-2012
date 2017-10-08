import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';
import TimeUntil from '../../common/inline-countdown/TimeUntil';
import { white } from '../../../styles/variables/colors';

const propTypes = {
  label: PropTypes.string,
  countdownTimestamp: PropTypes.number.isRequired,
};

const defaultProps = {
  label: '',
};

const SunsetCountdown = ({ label, countdownTimestamp }) => (
  <div className="root">
    <SectionHeader title={label} />
    <div className="countdown-container">
      <TimeUntil
        startTime={countdownTimestamp}
      />
    </div>

    <style jsx>{`
      .root {
        margin-bottom: 20px;
      }

      .countdown-container {
        background: rgba(0, 0, 0, 0.75);
        color: ${white}
        text-align: center;
        padding: 20px;
        font-size: 22px;
      }
    `}</style>
  </div>
);

SunsetCountdown.propTypes = propTypes;
SunsetCountdown.defaultProps = defaultProps;

export default SunsetCountdown;
