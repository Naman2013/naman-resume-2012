import React from 'react';

const MissionTimes = ({ startTime }) => {

  const EST_start = moment.unix(startTime).utcOffset(-5, false).format('dddd, MMMM Do');
  const EST_start_time = moment.unix(startTime).utcOffset(-5, false).format('h:mma');
  const PST_start_time = moment.unix(startTime).utcOffset(-8, false).format('h:mma');
  const UTC_start_time = moment.unix(startTime).format('HH:mm');

  return(
    <p className="start-time">
      <strong>{ EST_start }{ featured ? ':' : '' }</strong>
      { !featured ? <br /> : null} { EST_start_time } EST <span className="highlight">&middot;</span> { PST_start_time } PST <span className="highlight">&middot;</span> { UTC_start_time } UTC
    </p>
  );
};

export default MissionTimes;
