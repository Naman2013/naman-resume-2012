import React from 'react';

import Frame from './Frame';
import ViewControls from './ViewControls';
import Timestamp from './Timestamp';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

const VirtualTelescopeViewer = () => (
  <Frame>
    <div className="top">
      <ViewControls />
      <div className="timestamp">
        <Timestamp />
      </div>
      <CoordinateInformation />
    </div>

    <ZoomControls />

    <ObjectMetaInformation />

    <MissionTitle />

    <ImageProcessingInformation />

    <style jsx>{`
        .top {
          display: flex;
          justify-content: space-around;
          padding: 20px 20px;
        }

        .timestamp {
          flex-grow 2;
        }
    `}</style>
  </Frame>
);

export default VirtualTelescopeViewer;
