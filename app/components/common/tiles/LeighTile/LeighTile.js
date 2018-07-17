import React from 'react';
import PropTypes from 'prop-types';
import style from './LeighTile.style';
import { horizontalArrow } from 'styles/variables/iconURLs';

const LeighTile = ({ title, anchorText, link }) => (
  <div className="root">
    <h5 className="title">{title}</h5>
    <div className="action-container">
      <a className="action" href={link}>{anchorText}</a>
      <img alt="" src={horizontalArrow} />
    </div>
    <style jsx>{style}</style>
  </div>
);

LeighTile.propTypes = {
  title: PropTypes.string.isRequired,
  anchorText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LeighTile;
