import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const dateFormats = (unixTimestamp) => {
  const formattedUTCDate = new Date(unixTimestamp * 1000);
  return {
    estStart: moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do'),
    estStartTime: moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z'),
    pstStartTime: moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z'),
    utcStartTime: moment.utc(formattedUTCDate).format('HH:mm z'),
  };
};

const MissionStart = ({ missionStart }) => {
  const { estStart, estStartTime, pstStartTime, utcStartTime } = dateFormats(missionStart);
  return (
    <div>
      <b>{estStart}</b> <br />
      {estStartTime} • {pstStartTime} • {utcStartTime}
    </div>
  );
};

MissionStart.propTypes = {
  missionStart: PropTypes.number.isRequired,
};

export default MissionStart;
