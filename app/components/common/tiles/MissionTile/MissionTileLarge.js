import React from 'react';
import PropTypes from 'prop-types';
import style from './MissionTileLarge.style';

const MissionTileLarge = ({ title, telescope, dat, thyme }) => (
  <div className="root">
    <div className="left">
      <h5 className="title">{title}</h5>
      <div className="telescope">{telescope}</div>
    </div>
    <div className="right">
      <div className="dat">{dat}</div>
      <div className="thyme">{thyme}<span className="utc">UTC</span>
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

MissionTileLarge.propTypes = {
  title: PropTypes.string.isRequired,
  telescope: PropTypes.string.isRequired,
  dat: PropTypes.string.isRequired,
  thyme: PropTypes.string.isRequired,
};

export default MissionTileLarge;
