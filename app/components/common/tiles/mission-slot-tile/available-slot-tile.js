import React from 'react';
import PropTypes from 'prop-types';
import style from './available-slot-tile.style';

const AvailableSlotTile = ({
  missionTitle,
  time,
  date,
  telescopeName,
  handleScheduleClick,
}) => (
  <div className="available-slot-root">
    <h4 className="object-title">{missionTitle}</h4>

    <div className="time">
      <p>{time}</p>
      <p>UTC</p>
    </div>

    <ul className="attendee-info">
      <li>{date}</li>
      <li>{telescopeName}</li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

AvailableSlotTile.propTypes = {
  missionTitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  telescopeName: PropTypes.string.isRequired,
  handleScheduleClick: PropTypes.func.isRequired,
};

export { AvailableSlotTile };
