import React from 'react';
import PropTypes from 'prop-types';
import style from './mission-slot-tile.style';

const MissionSlotTile = ({
  missionTitle,
  time,
  date,
  attendeeCount,
}) => (
  <div className="mission-slot-root">
    <h4 className="object-title">{missionTitle}</h4>

    <div className="time">
      <p>{time}</p>
      <p>UTC</p>
    </div>

    <ul className="attendee-info">
      <li>{date}</li>
      <li>{attendeeCount} attendees</li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

MissionSlotTile.propTypes = {
  missionTitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  attendeeCount: PropTypes.string.isRequired,
};

export { MissionSlotTile };
