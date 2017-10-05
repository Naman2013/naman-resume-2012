import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SectionHeader from '../../common/headers/SectionHeader';
import InlineCountdown from '../../common/inline-countdown';
import { white } from '../../../styles/variables/colors';

const propTypes = {
  label: PropTypes.string,
  secondsRemaining: PropTypes.number.isRequired,
};

const defaultProps = {
  label: '',
};

function convertSecondsRemainingToTimestamp(seconds) {
  const now = moment.utc().add(seconds, 'seconds');
  return now.unix();
}

const SunsetCountdown = ({ label, secondsRemaining }) => (
  <div className="root">
    <SectionHeader title={label} />
    <div className="countdown-container">
      <InlineCountdown
        startTime={convertSecondsRemainingToTimestamp(secondsRemaining)}
        format="hh:mm:ss"
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
