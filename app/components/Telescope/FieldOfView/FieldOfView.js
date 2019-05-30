import React from 'react';
import PropTypes from 'prop-types';
import { getTelescope } from '../telescopeConfig';
import FOV from './FOV';

const FieldOfView = ({
  tickSpacing,
  canvasWidth,
  activeInstrumentID,
  previousInstrumentID,
  telescopeId,
  currentZoomIn,
  currentZoomOut,
  stroke,
}) => {
  const activeTelescope = getTelescope(activeInstrumentID);
  const previousTelescope = getTelescope(previousInstrumentID);
  const telescope = getTelescope(telescopeId);

  return (
    <g>
      {/* {currentZoomIn && !currentZoomOut && (
        <FOV
          tickSpacing={tickSpacing}
          canvasWidth={canvasWidth}
          gridWidth={activeTelescope.PORTAL.horizontal}
          largeRectGridWidth={activeTelescope.FOV.horizontal}
          stroke="#FAD59A"
        />
      )} */}

      {currentZoomOut && (
        <FOV
          tickSpacing={tickSpacing}
          canvasWidth={canvasWidth}
          gridWidth={previousTelescope.PORTAL.horizontal}
          largeRectGridWidth={previousTelescope.FOV.horizontal}
          stroke={stroke}
          telescope={telescope}
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
