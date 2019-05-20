/** *********************************
 * V4 StoryCard component
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import style from './StoryCard.style';
import messages from './StoryCard.messages';

const StoryCard = ({ story: { title, author, iconURL, linkUrl, hasLink } }) => (
  <a
    className="card-wrapper"
    href={hasLink ? linkUrl : ''}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="story-card">
      <div className="header">
        <div className="header-tile left">
          <FormattedMessage {...messages.Slooh} />
        </div>
        <div className="header-tile right">
          <FormattedMessage {...messages.News} />
        </div>
      </div>
      <div className="logo-wrapper">
        <div className="logo-border">
          <img src={iconURL} alt="icon" className="logo" />
        </div>
      </div>
      <div className="title">{title}</div>
      <div className="author">{author}</div>
    </div>
    <style jsx>{style}</style>
  </a>
);

StoryCard.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    iconURL: PropTypes.string,
    linkUrl: PropTypes.string,
    hasLink: PropTypes.bool,
  }).isRequired,
};

export default StoryCard;
