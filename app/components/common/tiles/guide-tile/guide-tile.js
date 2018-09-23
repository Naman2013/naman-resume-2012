import React from 'react';
import PropTypes from 'prop-types';
import style from './guide-tile.style';

const GuideTile = ({ title, subTitle }) => (
  <div className="guide-tile-root">
    <div className="guide-tile-frame">
      <h4>{title}</h4>
      <h5>{subTitle}</h5>
    </div>
    <style jsx>{style}</style>
  </div>
);

GuideTile.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default GuideTile;
