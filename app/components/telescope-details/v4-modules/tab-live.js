import React from 'react';
import Telescope from 'components/Telescope';
import telescopeConfig from 'components/Telescope/telescopeConfig';
import FAUX_MISSIONS, { nonMission } from 'content/fauxMissions';

import { StarShareCamera } from '../star-share-camera';
import { ObjectSummaryTile, ScheduledByTile } from 'components/common/tiles';
import { WhereInTheSky, AllSkyCamera } from './';

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
    <div className="tile-container">
      <ObjectSummaryTile />
    </div>

    <div className="tile-container">
      <ScheduledByTile />
    </div>

    <div className="tile-container">
      <WhereInTheSky />
    </div>

    <div className="tile-container">
      <AllSkyCamera imageURL="https://polaris.slooh.com/teide/2/highmag/2018/10/13/0555_m43/m43_20181013_055708_0_h4gimz_lrgb.png" />
    </div>

    <style jsx>{style}</style>
  </div>
);

export { TabLive };
