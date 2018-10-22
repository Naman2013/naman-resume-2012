import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './show-tile.style';

const ShowTile = ({ header, eventTitle, time, author, linkUrl }) => (
  <div className="root">
    <Link to={linkUrl} href={linkUrl}>
      <div className="show-tile-title">{eventTitle}</div>
      <div className="show-tile-header">Slooh Show</div>
    </Link>
    <style jsx>{style}</style>
  </div>
);

ShowTile.propTypes = {
  header: PropTypes.string.isRequired,
  eventTitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ShowTile;
