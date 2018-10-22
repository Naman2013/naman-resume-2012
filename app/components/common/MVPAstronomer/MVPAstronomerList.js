
/***********************************
* MVP Astronomer List
***********************************/

import React from 'react';
import MVPAstronomer from './MVPAstronomer';
import style from './MVPAstronomerList.style';

const MVPAstronomerList = (props) => (
  <div className="root">
    {Object.keys(props.specialistsList).map(function(key) {
      return(
        <MVPAstronomer
          id={props.specialistsList[key].customerId}
          displayName={props.specialistsList[key].displayName}
          iconURL={props.specialistsList[key].iconURL}
          gravityRank={props.specialistsList[key].gravityRankLabel}
          linkFlag={props.specialistsList[key].hasLinkFlag}
          linkURL={props.specialistsList[key].linkURL}
        />
      )
    })}
    <style jsx>{style}</style>
  </div>
);

export default MVPAstronomerList;

