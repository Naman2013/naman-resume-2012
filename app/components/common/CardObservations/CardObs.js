import React, { Fragment } from 'react';
import { DeviceContext } from '../../../providers/DeviceProvider';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = (props) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (!context.isMobile) {
            return ( <CardObsLarge {...props} /> );
          }
          return ( <CardObsSmall {...props} />);
        }
      }

    </DeviceContext.Consumer>
  </Fragment>
);


export default CardObs;
