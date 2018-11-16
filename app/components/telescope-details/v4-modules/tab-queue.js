import React from 'react';
import { AvailableSlotTile, MissionSlotTile } from 'components/common/tiles';
import { QueueNavigation } from './';
import ObservatoryBot from 'components/telescope-details/ObservatoryBot/ObservatoryBot';
import style from './tab-queue.style';

const testStuff = [0, 0, 1, 1, 0, 1, 0, 1];

const TabQueue = () => (
  <div className="tab-queue-root">
    <div className="tile-container">
      <ObservatoryBot
        viewGroup="queue"
        teleSystem="teide1highmag"
      />
    </div>
    <br/>
    <QueueNavigation
      handlePrevClick={() => { console.log('click-prev'); }}
      handleNextClick={() => { console.log('click-next'); }}
      title="Mon. Jan 06"
    />
    {
      testStuff.map((thing) => {
        if (thing) {
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
    <style jsx>{style}</style>
  </div>
);

export { TabQueue };
