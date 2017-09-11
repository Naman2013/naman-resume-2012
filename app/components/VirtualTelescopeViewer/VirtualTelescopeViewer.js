import React from 'react';

import Frame from './Frame';
import ViewControls from './ViewControls';
import Timestamp from './Timestamp';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import Bar from './Bar';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

const VirtualTelescopeViewer = () => (
  <Frame>
    <div className="top">
      <ViewControls />

      <div className="grow-2">
        <Timestamp />
      </div>

      <CoordinateInformation />
    </div>

    <div className="center">
      <div className="zoom-control">
        <ZoomControls />
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
        .top {
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

export default VirtualTelescopeViewer;
