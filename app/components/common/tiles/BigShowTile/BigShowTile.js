import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './BigShowTile.style';

const BigShowTile = ({
  heading,
  eventTitle,
  eventHost,
  linkUrl,
  dateDisplay,
  onMouseEnter,
}) => (
  <div className="card-shows" onMouseEnter={onMouseEnter}>
    <div className="show-card-head">{heading}</div>
    <Link to={linkUrl} href={linkUrl}>
      <div className="show-card-title">{eventTitle}</div>
    </Link>
    <div className="show-card-author">
      {dateDisplay}
      <span> | </span>
      {eventHost}
    </div>
    <style jsx>{style}</style>
  </div>
);

BigShowTile.propTypes = {
  heading: PropTypes.string.isRequired,
  eventTitle: PropTypes.string.isRequired,
  dateDisplay: PropTypes.string.isRequired,
  eventHost: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default BigShowTile;
