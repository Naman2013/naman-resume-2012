/** *********************************
 * V4 StoryCard component
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import style from './StoryCard.style';

const StoryCard = ({ story: { title, author, iconURL, linkUrl, hasLink } }) => {
  const { t } = useTranslation();
  return (
    <a
      className="card-wrapper"
      href={hasLink ? linkUrl : ''}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="story-card">
        <div className="header">
          <div className="header-tile left">{t('About.Slooh')}</div>
          <div className="header-tile right">{t('About.News')}</div>
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
};

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
