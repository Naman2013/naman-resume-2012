import React from 'react';
import Telescope from 'components/Telescope';
import telescopeConfig from 'components/Telescope/telescopeConfig';
import FAUX_MISSIONS, { nonMission } from 'content/fauxMissions';

import { StarShareCamera } from '../star-share-camera';
import { ObjectSummaryTile } from 'components/common/tiles';

import style from './tab-live.style';

const TabLive = () => (
  <div>
    <Telescope
      missionMetaData={nonMission}
      activeInstrumentID={telescopeConfig.CANARY_ONE_HALF_METER.instrumentID}
      previousInstrumentID={telescopeConfig.CANARY_ONE_HALF_METER.instrumentID}
      increment={5}
    />
    <StarShareCamera />
    <div className="object-summary-container">
      <ObjectSummaryTile />
    </div>

    <style jsx>{style}</style>
  </div>
);

export { TabLive };
