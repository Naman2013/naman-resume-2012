import React, { PropTypes } from 'react';

const MissionStart = ({ missionStart }) => (
  <div>
    <b>Thursday, October 18th</b> <br />
    10:05pm EST • 7:05pm PST • 03:05 UTC
  </div>
);

MissionStart.propTypes = {
  missionStart: PropTypes.number.isRequired,
};

export default MissionStart;
