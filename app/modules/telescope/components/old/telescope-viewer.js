import React from 'react';
import Telescope from 'components/Telescope';
import { StarShareCamera } from 'app/components/telescope-details/star-share-camera';

const TelescopeViewer = ({
  missionMetaData,
  activeInstrumentID,
  previousInstrumentID,
}) => (
  <div>
    <Telescope
      missionMetaData={missionMetaData}
      activeInstrumentID={activeInstrumentID}
      previousInstrumentID={previousInstrumentID}
      increment={5}
    />
    <StarShareCamera />
  </div>
);

export { TelescopeViewer };
