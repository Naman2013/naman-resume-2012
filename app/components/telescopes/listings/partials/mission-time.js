import React from 'react';
import moment from 'moment-timezone';

const MissionTime = ({ startTime }) => {
  const FORMAT = 'h:mma z';
  const MILITARY_FORMAT = 'HH:mm z';
  const formattedUTCDate = new Date(startTime * 1000);
  const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format(FORMAT);
  const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format(FORMAT);
  const UTC_start_time = moment.utc(formattedUTCDate).format(MILITARY_FORMAT);
  return (
    <div className="mission-time">
      <span className="highlight">{EST_start_time}</span><br />
      {PST_start_time} / {UTC_start_time}
    </div>
  );
}

export default MissionTime;
