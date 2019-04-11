import React, { Fragment } from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = props => {
  const { likesCount } = props;
  return likesCount ? (
    <Fragment>
      <DisplayAtBreakpoint screenSmall>
        <CardObsSmall {...props} />
      </DisplayAtBreakpoint>

      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <CardObsLarge {...props} />
      </DisplayAtBreakpoint>
    </Fragment>
  ) : null;
};

export default CardObs;
