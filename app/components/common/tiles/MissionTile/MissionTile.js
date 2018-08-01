import React, { Fragment } from 'react';
import { DeviceContext } from '../../../../providers/DeviceProvider';
import MissionTileLarge from './MissionTileLarge';
import MissionTileSmall from './MissionTileSmall';

const MissionTile = (props) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (!context.isMobile) {
            return ( <MissionTileLarge {...props} /> );
          }
          return ( <MissionTileSmall {...props} />);
        }
      }
    </DeviceContext.Consumer>
  </Fragment>
);

export default MissionTile;
