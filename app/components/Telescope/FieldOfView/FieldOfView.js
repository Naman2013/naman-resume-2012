import React from 'react';
import PropTypes from 'prop-types';
import { getTelescope } from '../telescopeConfig';
import FOV from './FOV';

const FieldOfView = ({
  tickSpacing,
  canvasWidth,
  activeInstrumentID,
  previousInstrumentID,
}) => {
  const activeTelescope = getTelescope(activeInstrumentID);
  const previousTelescope = getTelescope(previousInstrumentID);

  if (!previousTelescope) return null;

  return (
    <g>
      <FOV
        tickSpacing={tickSpacing}
        canvasWidth={canvasWidth}
        gridWidth={activeTelescope.PORTAL.horizontal}
        largeRectGridWidth={activeTelescope.FOV.horizontal}
        stroke="red"
      />

      <FOV
        tickSpacing={tickSpacing}
        canvasWidth={canvasWidth}
        gridWidth={previousTelescope.PORTAL.horizontal}
        largeRectGridWidth={previousTelescope.FOV.horizontal}
        stroke="aqua"
      />

      <FOV
        tickSpacing={tickSpacing}
        canvasWidth={canvasWidth}
        gridWidth={12}
      />
    </g>
  );
};

FieldOfView.propTypes = {
  tickSpacing: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  activeInstrumentID: PropTypes.string.isRequired,
  previousInstrumentID: PropTypes.string.isRequired,
};

export default FieldOfView;
