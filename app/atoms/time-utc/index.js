// @flow
import React from 'react';
import './styles.scss';

type TTimeUtc = {
  time: string | Date,
  timeZone?: string | Date,
  small?: boolean,
};

const TimeUtc = (props: TTimeUtc) => {
  const { time, timeZone, small } = props;
  const cls = 'time-utc';
  return (
    <div className={small ? `${cls} small` : cls}>
      <span>{time}</span>
      <span className="utc-vertical">{timeZone}</span>
    </div>
  );
};

TimeUtc.defaultProps = {
  small: false,
  timeZone: '',
};

export default TimeUtc;
