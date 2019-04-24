import React from 'react';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import style from './Story.style';

const StoryTile = ({ iconURL, title, author, theme, linkUrl, storyId }) => (
  <div className="root" style={theme} key={uniqueId()}>
    <div className="container">
      <span className="story-top">Slooh</span>
      <span className="story-top">Story</span>

      <div className="icon-container">
        <div className="center-line" />
        <div className="border">
          <div className="icon">
            <img
              className="icon-content"
              alt=""
              width="40"
              height="40"
              src={iconURL}
            />
          </div>
        </div>
      </div>
      <Link to={linkUrl || `community/post/${storyId}`} href={linkUrl}>
        <h5 className="title" dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      <div className="author">{author}</div>
    </div>
    <style jsx>{style}</style>
  </div>
);

StoryTile.propTypes = {
  iconURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  theme: PropTypes.shape({}),
  linkUrl: PropTypes.string,
  storyId: PropTypes.number,
};

StoryTile.defaultProps = {
  iconURL: '',
  theme: {},
  linkUrl: '',
  storyId: 0,
};

export default StoryTile;
