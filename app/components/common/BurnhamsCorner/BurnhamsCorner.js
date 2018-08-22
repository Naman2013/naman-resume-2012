import React, { Fragment } from 'react';
import { DeviceContext } from '../../../providers/DeviceProvider';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import BurnhamsCornerLarge from './BurnhamsCornerLarge';
import BurnhamsCornerSmall from './BurnhamsCornerSmall';

const BurnhamsCorner = props => (
  <Fragment>
    <DisplayAtBreakpoint screenSmall>
      <BurnhamsCornerLarge {...props} />
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
      <BurnhamsCornerSmall {...props} />
    </DisplayAtBreakpoint>
  </Fragment>
);


export default BurnhamsCorner;
