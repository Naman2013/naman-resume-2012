import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';
import TimeUntil from '../../common/inline-countdown/TimeUntil';
import { white } from '../../../styles/variables/colors';

const propTypes = {
  label: PropTypes.string,
  countdownTimestamp: PropTypes.number.isRequired,
  onExpired: PropTypes.func.isRequired,
};

const defaultProps = {
  label: '',
};

const SunsetCountdown = ({ label, countdownTimestamp, onExpired }) => (
  <div className="root">
    <SectionHeader title={label} />
    <div className="countdown-container">
      <TimeUntil
        onExpired={onExpired}
        startTime={countdownTimestamp}
        style={{
          textAlign: 'center',
          color: white,
          fontSize: '22px',
        }}
      />
    </div>

    <style jsx>{`
      .root {
        margin-bottom: 20px;
      }

      .countdown-container {
        background: rgba(0, 0, 0, 0.75);
        padding: 20px;
      }
    `}</style>
  </div>
);

SunsetCountdown.propTypes = propTypes;
SunsetCountdown.defaultProps = defaultProps;

export default SunsetCountdown;
