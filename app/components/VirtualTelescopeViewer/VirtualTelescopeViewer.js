import React from 'react';
import ViewControls from './ViewControls';
import Timestamp from './Timestamp';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

const VirtualTelescopeViewer = () => (
  <div className="root">
    <ViewControls />
    <Timestamp />
    <CoordinateInformation />

    <ZoomControls />

    <ObjectMetaInformation />
    <MissionTitle />
    <ImageProcessingInformation />
  </div>
);

export default VirtualTelescopeViewer;
