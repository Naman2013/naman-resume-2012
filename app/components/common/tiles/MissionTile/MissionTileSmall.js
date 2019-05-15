import React from 'react';
import PropTypes from 'prop-types';
import style from './MissionTileSmall.style';

const MissionTileSmall = ({ title, telescope, date, time, timezone }) => (
  <div className="root">
    <h5 className="title">{title}</h5>
    <div className="time">{time}</div>
    <div className="bottom">
      <div className="date">{date}</div>
      <div className="telescope">{telescope}</div>
    </div>
    <style jsx>{style}</style>
  </div>
);

MissionTileSmall.propTypes = {
  title: PropTypes.string.isRequired,
  telescope: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timezone: PropTypes.string,
};

MissionTileSmall.defaultProps = {
  timezone: 'UTC',
};

export default MissionTileSmall;
