import React from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = props => {
  return (
    <div className="i-wrapper">
      <DisplayAtBreakpoint screenSmall>
        <CardObsSmall {...props} />
      </DisplayAtBreakpoint>

      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <CardObsLarge {...props} />
      </DisplayAtBreakpoint>
    </div>
  );
};

export default CardObs;
