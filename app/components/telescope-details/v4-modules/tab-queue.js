import React from 'react';
import { AvailableSlotTile, MissionSlotTile } from 'components/common/tiles';
import { QueueNavigation } from './';

const testStuff = [0, 0, 1, 1, 0, 1, 0, 1];

const TabQueue = () => (
  <div>
    <QueueNavigation
      handlePrevClick={() => { console.log('click-prev'); }}
      handleNextClick={() => { console.log('click-next'); }}
      title="Mon. Jan 06"
    />
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
