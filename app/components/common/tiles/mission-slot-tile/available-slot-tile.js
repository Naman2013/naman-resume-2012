import React from 'react';
import PropTypes from 'prop-types';
import DefaultButton from 'app/components/common/style/buttons/Button';
import style from './available-slot-tile.style';

const AvailableSlotTile = ({
  time,
  date,
  handleScheduleClick,
}) => (
  <div className="available-slot-root">
    <h4 className="object-title">Available slot</h4>

    <div className="time">
      <div className="utc-time">
        <p>{time}</p>
        <p>UTC</p>
      </div>

      <div>
        <ul className="times">
          <li>16:30 EDT</li>
          <li>13:30 PDT</li>
        </ul>
      </div>
    </div>

    <ul className="attendee-info">
      <li>
        {date}
        <DefaultButton
          onClick={handleScheduleClick}
          theme={{ color: 'white', border: 'none', padding: '10px 0 0 0' }}
          text="Reserve now!"
        />
      </li>
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
