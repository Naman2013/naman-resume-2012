import React from 'react';
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import style from './LeighTile.style';
import { horizontalArrow } from 'styles/variables/iconURLs';

const LeighTile = ({ title, anchorText, link }) => (
  <Link to={link}>
    <div className="root">
      <h5 className="title">{title}</h5>
      <div className="action-container">
        {anchorText}
        <img alt="" src={horizontalArrow} />
      </div>
    </div>
    <style jsx>{style}</style>
  </Link>
);

LeighTile.propTypes = {
  title: PropTypes.string.isRequired,
  anchorText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LeighTile;
