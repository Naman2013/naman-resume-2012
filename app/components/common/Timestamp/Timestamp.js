import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const propTypes = {
  timestampInSeconds: PropTypes.number,
};

const defaultProps = {
  timestampInSeconds: 0,
};

const Timestamp = ({ timestampInSeconds }) => {
  if (!timestampInSeconds) return null;
  const convertedTimeStamp = timestampInSeconds * 1000;
  const easternTime = moment.tz(convertedTimeStamp, 'America/New_York').format('h:mma z');
  const pacificTime = moment.tz(convertedTimeStamp, 'America/Los_Angeles').format('h:mma z');
  const utcTime = moment.utc(convertedTimeStamp).format('HH:mm z');

  return (
    <span>{easternTime} · {pacificTime} · {utcTime}</span>
  );
};


Timestamp.propTypes = propTypes;
Timestamp.defaultProps = defaultProps;

export default Timestamp;
