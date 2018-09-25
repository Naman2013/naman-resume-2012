import React from 'react';
import PropTypes from 'prop-types';
import { guideCorner } from 'styles/variables/iconURLs';
import style from './guide-tile.style';

const GuideTile = ({ title, subTitle }) => (
  <div className="guide-tile-root">
    <div className="guide-tile-frame">
      <img alt="" className="top-left" src={guideCorner} />
      <img alt="" className="top-right" src={guideCorner} />
    </div>

    <div className="guide-tile-frame bottom">
      <img alt="" className="top-left" src={guideCorner} />
      <img alt="" className="top-right" src={guideCorner} />
    </div>

    <h4 className="title">{title}</h4>
    <h5 className="subTitle">{subTitle}</h5>
    <style jsx>{style}</style>
  </div>
);

GuideTile.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default GuideTile;
