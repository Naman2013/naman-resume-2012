// todo move to common componennts

import React from 'react';
import './styles.scss';

export const TimeUtc = props => {
  const { time } = props;
  return (
    <div className="time-utc">
      <span>{time}</span>
      <span className="utc-vertical">UTC</span>
    </div>
  );
};
