import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './QuestHubTileSmall.style';

const QuestHubTileSmall = ({
  linkUrl,
  questType,
  questDifficulty,
  iconURL,
  title,
  anchorText,
}) => (
  <div className="root">
    <Link to={linkUrl}>
      <div className="main-container">
        <h5 className="title">{title}</h5>
        <div className="left-container">
          <div className="quest-info-item top">
            <span dangerouslySetInnerHTML={{ __html: questType }} />
          </div>
          <div className="quest-info-item">
            <span dangerouslySetInnerHTML={{ __html: questDifficulty }} />
          </div>
        </div>
        <div className="right-container">
          <div className="icon-container">
            <div className="blue-shield" />
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
    </Link>
    <style jsx>{style}</style>
  </div>
);

QuestHubTileSmall.propTypes = {
  questType: PropTypes.string.isRequired,
  questDifficulty: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestHubTileSmall;
