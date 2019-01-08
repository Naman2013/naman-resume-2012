import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './BigShowTile.style';

const BigShowTile = ({
  header, title, displayDate, eventHostName, linkUrl, displayTime,
}) => (
  <div className="card-shows">
    <div className="show-card-head">{header}</div>
    <Link to={linkUrl} href={linkUrl}>
      <div className="show-card-title">{title}</div>
    </Link>
    <div className="show-card-author">
      {`${displayDate}, ${displayTime}`}
      <span> | </span>
      {eventHostName}
    </div>
    <style jsx>{style}</style>
  </div>
);

BigShowTile.propTypes = {
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayDate: PropTypes.string.isRequired,
  displayTime: PropTypes.string.isRequired,
  eventHostName: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default BigShowTile;
