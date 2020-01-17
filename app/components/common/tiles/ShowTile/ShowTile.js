import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './ShowTile.style';

const ShowTile = ({ header, title, time, author, linkUrl, readOnly }) => (
  <div className="root">
    <Link to={`${readOnly ? '' : linkUrl}`}>
      <div className="show-tile-header">{header}</div>
      <div className="show-tile-title">{title}</div>
      <div className="show-tile-author">
        {time}
        <span> | </span>
        {author}
      </div>
    </Link>
    <style jsx>{style}</style>
  </div>
);

ShowTile.propTypes = {
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string,
  author: PropTypes.string,
  linkUrl: PropTypes.string,
};

ShowTile.defaultProps = {
  linkUrl: '',
  author: '',
  time: '',
};

export default ShowTile;
