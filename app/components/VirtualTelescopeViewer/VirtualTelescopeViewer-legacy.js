import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Frame from './Frame';
import ViewControls from './ViewControls';
import Timestamp from './Timestamp';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import Bar from './Bar';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

const propTypes = {
  clipped: PropTypes.bool,
  handleToggleClip: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  zoomLevel: PropTypes.number,
};

const defaultProps = {
  clipped: false,
  handleToggleClip: noop,
  handleZoomIn: noop,
  handleZoomOut: noop,
  zoomLevel: 1,
};

/**
  - zoom level
  - handle zoom in
  - handle zoom out

  - panning location control
  - panning

  - handle clipping
*/

const VirtualTelescopeViewer = ({
  children,

  clipped,
  handleToggleClip,

  handleZoomIn,
  handleZoomOut,
  zoomLevel,
}) => (
  <Frame
    zoomLevel={zoomLevel}
    framedContent={children}
    clipped={clipped}
  >
    <div className="top">
      <div className="top-container">
        <ViewControls
          handleToggleClip={handleToggleClip}
        />

        <div className="grow-2">
          <Timestamp />
        </div>

        <CoordinateInformation />
      </div>
    </div>

    <div className="center">
      <div className="zoom-control">
        <ZoomControls
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
      </div>
      <div className="cosmetic-bar-shape">
        <Bar />
      </div>
    </div>

    <div className="bottom">
      <div className="bottom-container">
        <ObjectMetaInformation />

        <div className="grow-2">
          <MissionTitle />
        </div>

        <ImageProcessingInformation />
      </div>
    </div>

    <style jsx>{`
      .content {
        width: 100%;
        height: 100%;
      }

      .top {
        position: absolute;
        top: 0;
        width: 100%;
      }

      .top-container {
        display: flex;
        justify-content: space-around;
        padding: 20px;
      }

      .grow-2 {
        flex-grow 2;
      }

      .zoom-control, .cosmetic-bar-shape {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .zoom-control {
        left: 20px;
      }

      .cosmetic-bar-shape {
        right: 20px;
      }

      .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
      }

      .bottom-container {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        padding: 30px;
      }
    `}</style>
  </Frame>
);

VirtualTelescopeViewer.propTypes = propTypes;
VirtualTelescopeViewer.defaultProps = defaultProps;

export default VirtualTelescopeViewer;
