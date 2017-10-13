import React from 'react';
import DayNightTimeline from '../condition-snapshot/DayNightTimeline';
import DayNightMap from '../condition-snapshot/DayNightMap';
import AllSkyCamera from '../condition-snapshot/AllSkyCamera';
import DomeCam from '../condition-snapshot/DomeCam';
import LiveWebcam from '../live-webcam/live-webcam';

import CenterContent from '../../../design-system/CenterContent';

export default function generateTabConfiguration({
  obsId,
  currentConditionsURL,
  dayNightBarRefreshInterval,
  dayNightBarURL,
  dayNightBarImageWidth,
  dayNightMapRefreshInterval,
  dayNightMapURL,
  dayNightMapImageWidth,
  allSkyRefreshIntervalSec,
  allSkyCamURL,
  allSkyCamOfflineURL,
  allSkyCamOnlineStatus,
  allSkyCamImageWidth,
  domeCamRefreshIntervalSec,
  domeCamURL,
  domeCamOfflineURL,
  domeCamOnlineStatus,
  domeCamImageWidth,
  facilityWebcamWidgetId, // TODO: require the image width here....
}) {
  return (
  [
    {
      tabText: 'Day/Night Bar',
      tabContent: (
        <CenterContent>
          <DayNightTimeline
            dayNightBarURL={dayNightBarURL}
            refreshIntervalSec={dayNightBarRefreshInterval}
            imageWidth={dayNightBarImageWidth}
          />
          <DayNightMap
            refreshIntervalSec={dayNightMapRefreshInterval}
            dayNightMapURL={dayNightMapURL}
            imageWidth={dayNightMapImageWidth}
          />
        </CenterContent>
      ),
    },
    {
      tabText: 'All Sky Camera',
      tabContent: (
        <CenterContent>
          <AllSkyCamera
            refreshIntervalSec={allSkyRefreshIntervalSec}
            allSkyCamURL={allSkyCamURL}
            offlineImageURL={allSkyCamOfflineURL}
            onlineStatus={allSkyCamOnlineStatus}
            imageWidth={allSkyCamImageWidth}
          />
        </CenterContent>
      ),
    },
    {
      tabText: 'Dome',
      tabContent: (
        <CenterContent>
          <DomeCam
            refreshIntervalSec={domeCamRefreshIntervalSec}
            domeCamURL={domeCamURL}
            offlineImageURL={domeCamOfflineURL}
            onlineStatus={domeCamOnlineStatus}
            imageWidth={domeCamImageWidth}
          />
        </CenterContent>
      ),
    },
    {
      tabText: 'Horizon',
      tabContent: (
        <CenterContent>
          <LiveWebcam
            obsId={obsId}
            facilityWebcamWidgetId={facilityWebcamWidgetId}
          />
        </CenterContent>
      ),
    },
  ]
  );
}
