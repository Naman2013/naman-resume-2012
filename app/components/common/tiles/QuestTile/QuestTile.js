import React from 'react';
import PropTypes from 'prop-types';
import style from './QuestTile.style';

const QuestTile = ({ iconURL, title, anchorText }) => (
  <div className="root">
    <div className="container">
      <div className="icon-container">
        <img className="icon-content" alt="" width="40" height="40" src={iconURL} />
      </div>
      <h5 className="title">{title}</h5>
      <div className="button-container">
        <a className="button" href="#">{anchorText}</a>
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

QuestTile.propTypes = {
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestTile;
