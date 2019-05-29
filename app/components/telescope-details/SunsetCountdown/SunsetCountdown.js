import React from 'react';
import PropTypes from 'prop-types';
import { ModuleContainer } from 'app/modules/telescope/components/old/module-container';
import SectionHeader from '../../common/headers/SectionHeader';
import TimeUntil from '../../common/inline-countdown/TimeUntil';
import { fontBlack } from '../../../styles/variables/colors';

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
    <ModuleContainer title={label}>
      <TimeUntil
        onExpired={onExpired}
        startTime={countdownTimestamp}
        style={{
          textAlign: 'center',
          color: fontBlack,
          fontSize: '22px',
        }}
      />
    </ModuleContainer>
  </div>
);

SunsetCountdown.propTypes = propTypes;
SunsetCountdown.defaultProps = defaultProps;

export default SunsetCountdown;
