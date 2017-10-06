import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';
import InlineCountdown from '../../common/inline-countdown';
import { white } from '../../../styles/variables/colors';

const propTypes = {
  label: PropTypes.string,
  countdownTimestamp: PropTypes.number.isRequired,
  serverTimestamp: PropTypes.string.isRequired,
};

const defaultProps = {
  label: '',
};

const SunsetCountdown = ({ label, countdownTimestamp, serverTimestamp }) => (
  <div className="root">
    <SectionHeader title={label} />
    <div className="countdown-container">
      <InlineCountdown
        startTime={countdownTimestamp}
        format="hh:mm:ss"
        serverTimestamp={serverTimestamp}
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
