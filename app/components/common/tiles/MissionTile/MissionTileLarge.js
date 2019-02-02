import React from 'react';
import PropTypes from 'prop-types';
import style from './MissionTileLarge.style';

const MissionTileLarge = ({
  title, telescope, date, time, timezone,
}) => (
  <div className="root">
    <div className="left">
      <h5 className="title">{title}</h5>
      <div className="telescope">{telescope}</div>
    </div>
    <div className="right">
      <div className="date">{date}</div>
      <div className="time">
        {time}
        <span className="utc">{timezone}</span>
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

MissionTileLarge.propTypes = {
  title: PropTypes.string.isRequired,
  telescope: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timezone: PropTypes.string,
};

MissionTileLarge.defaultProps = {
  timezone: 'UTC',
};

export default MissionTileLarge;
