
/***********************************
* MVP Astronomer List
***********************************/

import React, { Component, Fragment } from 'react';
import CenterColumn from '../CenterColumn';
import MVPAstronomer from './MVPAstronomer';
import style from './MVPAstronomerList.style';

const MVPAstronomerList = (props) => (
  <Fragment>
    <CenterColumn>
      <div className="card-container__specialists">
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
      </div>
    </CenterColumn>
    <style jsx>{style}</style>
  </Fragment>
);

export default MVPAstronomerList;