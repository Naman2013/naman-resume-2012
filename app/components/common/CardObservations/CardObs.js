import React, { Fragment } from 'react';
import { DeviceContext } from '../../../providers/DeviceProvider';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = () => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (!context.isMobile) {
            return ( <CardObsLarge /> );
          }
          return ( <CardObsSmall />);
        }
      }

    </DeviceContext.Consumer>
  </Fragment>
);


export default CardObs;
