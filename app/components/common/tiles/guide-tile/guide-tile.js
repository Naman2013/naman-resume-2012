import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { guideCorner } from 'styles/variables/iconURLs';
import style from './guide-tile.style';

const GuideTile = ({ title, subTitle, linkURL }) => (
  <div className="guide-tile-root">
    <Link to={linkURL}>
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
    </Link>
    <style jsx>{style}</style>
  </div>
);

GuideTile.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};

export default GuideTile;
