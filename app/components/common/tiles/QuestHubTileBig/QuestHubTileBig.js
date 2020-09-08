import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './QuestHubTileBig.style';

const QuestHubTileBig = ({
  linkUrl,
  questType,
  questDifficulty,
  iconURL,
  title,
  anchorText,
}) => (
  <div className="root">
    <Link to={linkUrl}>
      <div className="container">
        {/* <div className="blue-shield" /> */}
        <div className="icon-container">
          <img
            className="icon-content"
            alt=""
            width="100"
            height="100"
            src={iconURL}
          />
        </div>
        <h5 className="title">{title}</h5>
      </div>
      <div className="quest-info">
        <div className="quest-info-item left">
          <span dangerouslySetInnerHTML={{ __html: questType }} />
        </div>
        <div className="quest-info-item">
          <span dangerouslySetInnerHTML={{ __html: questDifficulty }} />
        </div>
      </div>
    </Link>
    <style jsx>{style}</style>
  </div>
);

QuestHubTileBig.propTypes = {
  questType: PropTypes.string.isRequired,
  questDifficulty: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestHubTileBig;
