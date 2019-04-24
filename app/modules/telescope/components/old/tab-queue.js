import React from 'react';
import { AvailableSlotTile, MissionSlotTile } from 'components/common/tiles';
import QueueTab from 'app/modules/telescope/containers/telescope-queue-tab';
import { ObsBotWidget, QueueNavigation } from './index';
import style from './tab-queue.style';

const TabQueue = props => (
  <div className="tab-queue-root">
    {props.currentTelescope.teleHasNeoView && (
      <div className="tile-container">
        <ObsBotWidget {...props} ViewGroup="queue" />
        <br />
      </div>
    )}
    <QueueTab
      currentTelescope={props.currentTelescope}
      currentObservatory={props.currentObservatory}
      mobileMissionList
    />
    <style jsx>{style}</style>
  </div>
);

export { TabQueue };
