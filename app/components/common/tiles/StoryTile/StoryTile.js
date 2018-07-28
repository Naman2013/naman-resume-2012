import React from 'react';
import PropTypes from 'prop-types';
import style from './Story.style';

const StoryTile = ({ iconURL, title, author }) => (
  <div className="root">
    <div className="container">

      <span className="story-top">Slooh</span>
      <span className="story-top">Story</span>

      <div className="icon-container">
        <div className="center-line" />
        <div className="border">
          <div className="icon">
            <img className="icon-content" alt="" width="40" height="40" src={iconURL} />
          </div>
        </div>
      </div>

      <h5 className="title">{title}</h5>
      <div className="author">{author}</div>
    </div>
    <style jsx>{style}</style>
  </div>
);

StoryTile.propTypes = {
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default StoryTile;
