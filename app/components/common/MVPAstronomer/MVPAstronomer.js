
/***********************************
* MVP Astronomer Card
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import style from './MVPAstronomer.style';

const MVPAstronomer = ({
  id,
  displayName,
  iconURL,
  gravityRank,
  linkFlag,
  linkURL,
}) => (
  <div className="mvp-card" key={'card_' + id}>
    <div className="mvp-icon"><img src={iconURL}/></div>
    <h5>{displayName}</h5>
    {linkFlag &&                 
      <a className="mvp-btn" href={linkURL}>{gravityRank}</a>
    }
    <style jsx>{style}</style>
  </div>
);

MVPAstronomer.propTypes = {
  id: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  iconURL: PropTypes.string.isRequired,
  gravityRank: PropTypes.string.isRequired,
  linkFlag: PropTypes.bool.isRequired,
  linkURL: PropTypes.string.isRequired,
};
  
export default MVPAstronomer;