import React from 'react';
import DayNightTimeline from '../condition-snapshot/DayNightTimeline';
import DayNightMap from '../condition-snapshot/DayNightMap';
import AllSkyCamera from '../condition-snapshot/AllSkyCamera';
import DomeCam from '../condition-snapshot/DomeCam';
import LiveWebcam from '../live-webcam/live-webcam';

export default function generateTabConfiguration({
  obsId,
  currentConditionsURL,
  dayNightBarRefreshInterval,
  dayNightBarURL,
  dayNightMapRefreshInterval,
  dayNightMapURL,
  allSkyRefreshIntervalSec,
  allSkyCamURL,
  allSkyCamOfflineURL,
  allSkyCamOnlineStatus,
  domeCamRefreshIntervalSec,
  domeCamURL,
  domeCamOfflineURL,
  domeCamOnlineStatus,
  facilityWebcamWidgetId,
}) {
  return (
  [
    {
      tabText: 'Day/Night Bar',
      tabContent: (
        <div>
          <DayNightTimeline
            dayNightBarURL={dayNightBarURL}
            refreshIntervalSec={dayNightBarRefreshInterval}
          />
          <DayNightMap
            refreshIntervalSec={dayNightMapRefreshInterval}
            dayNightMapURL={dayNightMapURL}
          />
        </div>),
    },
    {
      tabText: 'All Sky Camera',
      tabContent: (
        <AllSkyCamera
          refreshIntervalSec={allSkyRefreshIntervalSec}
          allSkyCamURL={allSkyCamURL}
          offlineImageURL={allSkyCamOfflineURL}
          onlineStatus={allSkyCamOnlineStatus}
        />
      ),
    },
    {
      tabText: 'Dome',
      tabContent: (
        <DomeCam
          refreshIntervalSec={domeCamRefreshIntervalSec}
          domeCamURL={domeCamURL}
          offlineImageURL={domeCamOfflineURL}
          onlineStatus={domeCamOnlineStatus}
        />
      ),
    },
    {
      tabText: 'Horizon',
      tabContent: (
        <LiveWebcam
          obsId={obsId}
          facilityWebcamWidgetId={facilityWebcamWidgetId}
        />
      ),
    },
  ]
  );
}
