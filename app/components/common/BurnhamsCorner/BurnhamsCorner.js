import React, { Fragment } from 'react';
import { DeviceContext } from '../../../providers/DeviceProvider';
import BurnhamsCornerLarge from './BurnhamsCornerLarge';
import BurnhamsCornerSmall from './BurnhamsCornerSmall';

const BurnhamsCorner = (props) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (!context.isMobile) {
            return ( <BurnhamsCornerLarge {...props} /> );
          }
          return ( <BurnhamsCornerSmall {...props} />);
        }
      }
    </DeviceContext.Consumer>
  </Fragment>
);


export default BurnhamsCorner;
