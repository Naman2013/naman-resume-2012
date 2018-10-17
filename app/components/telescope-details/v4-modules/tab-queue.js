import React from 'react';
import { AvailableSlotTile, MissionSlotTile } from 'components/common/tiles';

const testStuff = [0, 0, 1, 1, 0, 1, 0, 1];

const TabQueue = () => (
  <div>
    {
      testStuff.map((thing) => {
        if (thing === 0) {
          return (<MissionSlotTile
            missionTitle="The moon"
            time="20:30"
            date="Mon. Jan. 06"
            scheduledBy="Paul"
          />);
        }
        return (<AvailableSlotTile
          missionTitle="The moon"
          time="20:30"
          date="Mon. Jan. 06"
          telescopeName="Canary three"
        />);
      })
    }
  </div>
);

export { TabQueue };
