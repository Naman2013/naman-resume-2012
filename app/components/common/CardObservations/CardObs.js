import React from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = props => {
  const { likesCount } = props;
  return likesCount ? (
    <div className="i-wrapper">
      <DisplayAtBreakpoint screenSmall>
        <CardObsSmall {...props} />
      </DisplayAtBreakpoint>

      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <CardObsLarge {...props} />
      </DisplayAtBreakpoint>
    </div>
  ) : null;
};

export default CardObs;
