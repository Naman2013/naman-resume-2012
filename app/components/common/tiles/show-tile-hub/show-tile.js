import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './show-tile.style';

const ShowTile = ({ eventTitle, linkUrl }) => (
  <div className="root">
    <Link to={linkUrl} href={linkUrl}>
      <div className="show-tile-title">{eventTitle}</div>
      <div className="show-tile-header">Slooh Show</div>
    </Link>
    <style jsx>{style}</style>
  </div>
);

ShowTile.propTypes = {
  eventTitle: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default ShowTile;
