import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Rails from './Rails';

import ViewControls from './ViewControls';
import Timestamp from './Timestamp';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import Bar from './Bar';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';

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


const VirtualTelescopeView = ({
  children,

  clipped,
  handleToggleClip,

  handleZoomIn,
  handleZoomOut,
  zoomLevel,
}) => (
  <div className="root">

    <div className="frame">
      <div className="virtual-telescope-view-content-container">
        { children }
        <Rails />

        <div className="virtual-telescope-view-control-container">
          <div className="top">
            <div className="top-container">
              <ViewControls
                handleToggleClip={handleToggleClip}
                clipped={clipped}
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
        </div> {/** end of contols - TODO: refactor these out of the file... */}

      </div>
    </div>

    <style jsx>{`
      .root {
        background-color: ${black};
        margin: 0;
        padding: 0;
      }

      .frame {
        position: relative;
        min-height: 500px;
        border: 1px solid ${brightGreen};
        padding: 0;
      }

      :global(.virtual-telescope-view-content-container img) {
        display: block;
        width: 100%;
        height: 100%;
      }

      .virtual-telescope-view-control-container {
        font-family: ${monoFont};
        color: ${brightGreen};
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
  </div>
);

VirtualTelescopeView.propTypes = propTypes;
VirtualTelescopeView.defaultProps = defaultProps;

export default VirtualTelescopeView;
