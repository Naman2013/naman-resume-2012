import React, { Fragment } from 'react';
import { DeviceContext } from '../../../providers/DeviceProvider';
import CardObsLarge from './CardObsLarge';

const CardObs = () => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (!context.isMobile) {
            return ( <CardObsLarge /> );
          }

          return ( <div>poop</div>);
        }
      }

    </DeviceContext.Consumer>
  </Fragment>
);


export default CardObs;
