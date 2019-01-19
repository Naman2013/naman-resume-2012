/** *********************************
 * V4 MVP Astronomer Card
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import style from './MVPAstronomerCard.style';

const MVPAstronomerCard = ({
  gravityRankLabel, displayName, iconUrl, gravity, cardClass,
}) => (
  <div className={`mvp-card ${cardClass}`} key={uniqueId()}>
    <div className="mvp-icon">
      <img className="mvp-icon-content" src={iconUrl} alt="" />
    </div>
    <h5>{displayName}</h5>
    <div className="mvp-gravity">
      <div className="mvp-gravity-label">{gravityRankLabel}</div>
      <div className="mvp-gravity-rank">
        <img className="star" src="https://vega.slooh.com/assets/v4/common/star_icon.svg" alt="" />{' '}
        <span>{gravity}</span>
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

MVPAstronomerCard.propTypes = {
  gravityRankLabel: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  gravity: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
};

export default MVPAstronomerCard;
