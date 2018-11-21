import React from 'react';
import { AvailableSlotTile, MissionSlotTile } from 'components/common/tiles';
import { ObsBotWidget, QueueNavigation } from './';
import style from './tab-queue.style';

const testStuff = [0, 0, 1, 1, 0, 1, 0, 1];

const TabQueue = (props) => (
  <div className="tab-queue-root">
    <div className="tile-container">
      <ObsBotWidget {...props} ViewGroup="queue"/>
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
