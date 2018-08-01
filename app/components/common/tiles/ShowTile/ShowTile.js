import React from 'react';
import PropTypes from 'prop-types';
import style from './ShowTile.style';

const ShowTile = ({ header, title, time, author, link }) => (
  <div className="root">
    <div className="show-tile-header">{header}</div>
    <div className="show-tile-title">{title}</div>
    <div className="show-tile-author">{time}<span>|</span>{author}</div>
    <style jsx>{style}</style>
  </div>
);

ShowTile.propTypes = {
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ShowTile;
