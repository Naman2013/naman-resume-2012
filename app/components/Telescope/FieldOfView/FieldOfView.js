import React from 'react';
import PropTypes from 'prop-types';
import { getTelescope } from '../telescopeConfig';
import FOV from './FOV';

const FieldOfView = ({
  tickSpacing,
  canvasWidth,
  activeInstrumentID,
  previousInstrumentID,
  currentZoomIn,
  currentZoomOut,
}) => {
  const activeTelescope = getTelescope(activeInstrumentID);
  const previousTelescope = getTelescope(previousInstrumentID);

  return (
    <g>
      {currentZoomIn && !currentZoomOut && (
        <FOV
          tickSpacing={tickSpacing}
          canvasWidth={canvasWidth}
          gridWidth={activeTelescope.PORTAL.horizontal}
          largeRectGridWidth={activeTelescope.FOV.horizontal}
          stroke="gold"
        />
      )}

      {currentZoomOut && (
        <FOV
          tickSpacing={tickSpacing}
          canvasWidth={canvasWidth}
          gridWidth={previousTelescope.PORTAL.horizontal}
          largeRectGridWidth={previousTelescope.FOV.horizontal}
          stroke={currentZoomIn ? 'gold' : 'aqua'}
          telescope={currentZoomIn ? previousTelescope : activeTelescope}
        />
      )}
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
