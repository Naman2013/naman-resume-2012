import React from 'react';
import PropTypes from 'prop-types';
import DefaultButton from 'app/components/common/style/buttons/Button';
import style from './mission-slot-tile.style';

const MissionSlotTile = ({
  missionTitle,
  time,
  date,
  scheduledBy,
  onAutosaveClick,
}) => (
  <div className="mission-slot-root">
    <h4 className="object-title">{missionTitle}</h4>

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
        <br />
        Scheduled by: {scheduledBy}
      </li>
      <li>
        <DefaultButton onClick={onAutosaveClick} text="autosave" />
      </li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

MissionSlotTile.propTypes = {
  missionTitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  scheduledBy: PropTypes.string.isRequired,
  onAutosaveClick: PropTypes.func.isRequired,
};

export { MissionSlotTile };
