import React from 'react';
import PropTypes from 'prop-types';
import style from './LeighTile.style';

const LeighTile = ({ title, anchorText, createLink }) => (
  <div className="root">
    <h5 className="title">{title}</h5>
    <div className="action-container">
      <a className="action" href={createLink}>{anchorText}</a>
    </div>
    <style jsx>{style}</style>
  </div>
);

LeighTile.propTypes = {
  title: PropTypes.string.isRequired,
  anchorText: PropTypes.string.isRequired,
  createLink: PropTypes.func,
};

LeighTile.defaultProps = {
  createLink: () => '#',
};

export default LeighTile;
