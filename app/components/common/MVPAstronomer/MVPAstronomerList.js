
/***********************************
* MVP Astronomer List
***********************************/

import React from 'react';
import uniqueId from 'lodash/uniqueId';
import MVPAstronomer from 'components/community-groups/overview/members-list-card';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './MVPAstronomerList.style';

const MVPAstronomerList = props => (
  <div className="root">
    <DisplayAtBreakpoint
      screenSmall
      screenXLarge
      screenLarge>
      {props.specialistsList.map(specialist =>
        <MVPAstronomer
          key={uniqueId()}
          theme={{ margin: 0 }}
          {...specialist}
        />
      )}
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint
      screenMedium>
      {props.specialistsList.map(specialist =>
        <MVPAstronomer
          key={uniqueId()}
          {...specialist}
        />
      )}
    </DisplayAtBreakpoint>

    <style jsx>{style}</style>
  </div>
);

export default MVPAstronomerList;
