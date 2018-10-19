import React from 'react';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { ColumnTabs } from 'components/common/Tabs';
import Telescope from 'components/Telescope';
import telescopeConfig from 'components/Telescope/telescopeConfig';
import FAUX_MISSIONS, { nonMission } from 'content/fauxMissions';
import {
  TabConditions,
  TabLive,
  TabQueue,
  TabTelescope,
} from 'components/telescope-details/v4-modules';
import style from './v4-telescope-details.style';

const TelescopeDetails = () => (
  <div className="details-root">

    <DisplayAtBreakpoint screenLarge screenXLarge>
      <div className="viewer">
        <Telescope
          missionMetaData={FAUX_MISSIONS.nonMission}
          activeInstrumentID={telescopeConfig.CANARY_ONE_HALF_METER.instrumentID}
          previousInstrumentID={telescopeConfig.CANARY_TWO_WIDE_FIELD.instrumentID}
          increment={5}
        />
      </div>
    </DisplayAtBreakpoint>


    <div className="column">
      <ColumnTabs
        tabConfiguration={[
          { tabTitle: 'Live', content: () => (<TabLive />) },
          { tabTitle: 'Queue', content: () => (<TabQueue />) },
          { tabTitle: 'Cond.', content: () => (<TabConditions />) },
          { tabTitle: 'Scope', content: () => (<TabTelescope />) },
        ]}
      />
    </div>

    <style jsx>{style}</style>
  </div>
);

export { TelescopeDetails };
