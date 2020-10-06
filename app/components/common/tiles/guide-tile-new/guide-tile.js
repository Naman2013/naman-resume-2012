import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { guideCorner } from 'app/styles/variables/iconURLs';
import style from './guide-tile.style';

const GuideTileNew = ({ title, subTitle, linkUrl, theme, handleBacktoQuest }) => (
  <div className="guide-tile-root" style={theme}>
    <Link to={linkUrl} onClick={handleBacktoQuest}>
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

GuideTileNew.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default GuideTileNew;
