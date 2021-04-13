/** *********************************
 * V4 MVP Astronomer Card
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import style from './MVPAstronomerCardNew.style';

const MVPAstronomerCardNew = ({
  gravityRankLabel,
  displayName,
  iconUrl,
  gravity,
  cardClass,
  hasLinkFlag,
  onClick,
}) => (
  <div className={`mvp-card ${cardClass}`} key={uniqueId()}>
    <div className="mvp-icon">
      <div className="mvp-icon-container">
        <img className="mvp-icon-content" src={iconUrl} alt="" />        
      </div>
      <h5 onClick={hasLinkFlag ? onClick : null} className="mvp-name">{displayName}</h5>
    </div>    
    <div className="mvp-gravity">
      <div className="mvp-gravity-label">{gravityRankLabel}</div>
      <div className="mvp-gravity-rank">
        <img
          className="star"
          src="https://vega.slooh.com/assets/v4/common/star_icon.svg"
          alt=""
        />{' '}
        <span>{gravity}</span>
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

MVPAstronomerCardNew.propTypes = {
  gravityRankLabel: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  gravity: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
  hasLinkFlag: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MVPAstronomerCardNew;
