import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import cn from 'classnames';
import styles from './RecommendedQuestItem.style';
import messages from './RecommendedQuestItem.messages';

const { string, bool } = PropTypes;

const RecommendedQuestsItem = ({
  questDifficulty,
  title,
  iconUrl,
  hasLink,
  linkUrl,
}) => {
  const { t } = useTranslation();
  return (
    <div className="root">
      <Link to={linkUrl} className={cn({ 'disable-link': hasLink })}>
        <div className="container">
          <div className="blue-shield" />
          <div className="icon-container">
            <img
              className="icon-content"
              alt=""
              width="40"
              height="40"
              src={iconUrl}
            />
          </div>
          <h5 className="title">{title}</h5>
          <h6 className="level">{questDifficulty}</h6>
        </div>
        <div className="quest-info">
          <div className="quest-info-item left">
            <span>{t('.Slooh')}</span>
          </div>
          <div className="quest-info-item right">
            <span>{t('.Quest')}</span>
          </div>
        </div>
      </Link>
      <style jsx>{styles}</style>
    </div>
  );
};

RecommendedQuestsItem.propTypes = {
  questDifficulty: string.isRequired,
  title: string.isRequired,
  iconUrl: string.isRequired,
  hasLink: bool.isRequired,
  linkUrl: string.isRequired,
};

export default RecommendedQuestsItem;
