import React from 'react';
import PropTypes from 'prop-types';
import style from './MissionTileSmall.style';

const MissionTileSmall = ({ title, telescope, dat, thyme }) => (
  <div className="root">
      <h5 className="title">{title}</h5>
      <div className="thyme">{thyme}</div>
      <div className="bottom">
        <div className="dat">{dat}</div>
        <div className="telescope">{telescope}</div>
      </div>
    <style jsx>{style}</style>
  </div>
);

MissionTileSmall.propTypes = {
  title: PropTypes.string.isRequired,
  telescope: PropTypes.string.isRequired,
  dat: PropTypes.string.isRequired,
  thyme: PropTypes.string.isRequired,
};

export default MissionTileSmall;
