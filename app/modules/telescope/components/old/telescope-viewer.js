import React from 'react';
import Telescope from 'app/components/Telescope';
import { StarShareCamera } from 'app/components/telescope-details/star-share-camera';

const TelescopeViewer = ({
  missionMetaData,
  currentInstrumentID,
  previousInstrumentID,
}) => (
  <div>
    <Telescope
      missionMetaData={missionMetaData}
      currentInstrumentID={currentInstrumentID}
      previousInstrumentID={previousInstrumentID}
      increment={5}
    />
    <StarShareCamera />
  </div>
);

export { TelescopeViewer };
