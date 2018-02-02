import React from 'react';
import DayNightBarPanel from '../condition-snapshot/DayNightBarPanel';
import DayNightMap from '../condition-snapshot/DayNightMap';
import AllSkyCamera from '../condition-snapshot/AllSkyCamera';
import DomeCam from '../condition-snapshot/DomeCam';
import LiveWebcam from '../live-webcam/live-webcam';
import CenterContent from '../../../design-system/CenterContent';

import TelescopeDetailsWeatherTabs from '../TelescopeDetailsWeatherTabs';

const inlineTitleStyle = {
  color: 'white',
}

export default function generateTelescopeDetailsTabConfiguration({
  obsId,
  currentConditionsURL,
  dayNightBarPanelRefreshInterval,
  dayNightBarPanelURL,
  dayNightBarPanelImageWidth,
  dayNightBarPanelTitle,
  dayNightMapRefreshInterval,
  dayNightMapURL,
  dayNightMapImageWidth,
  dayNightMapTitle,
  allSkyRefreshIntervalSec,
  allSkyCamURL,
  allSkyCamOfflineURL,
  allSkyCamOnlineStatus,
  allSkyCamImageWidth,
  allSkyCamTitle,
  domeCamRefreshIntervalSec,
  domeCamURL,
  domeCamOfflineURL,
  domeCamOnlineStatus,
  domeCamImageWidth,
  domeCamTitle,
  FacilityWebcamWidgetId,
  MiniWeatherPanelWidgetId,
  SatelliteWidgetId,
  WeatherConditionsWidgetId,
  MissionControlStatusWidgetId,
}) {
  return (
  [
    {
      tabText: 'Day/Night Bar',
      tabContent: (
        <CenterContent>
        <h1 style={inlineTitleStyle}>{dayNightBarPanelTitle}</h1>
          <DayNightBarPanel
            refreshIntervalSec={dayNightBarPanelRefreshInterval}
            dayNightBarPanelURL={dayNightBarPanelURL}
            imageWidth={dayNightBarPanelImageWidth}
          />
        </CenterContent>
      ),
    },
    {
      tabText: 'Day/Night Map',
      tabContent: (
        <CenterContent>
          <h1 style={inlineTitleStyle}>{dayNightMapTitle}</h1>
          <DayNightMap
            refreshIntervalSec={dayNightMapRefreshInterval}
            dayNightMapURL={dayNightMapURL}
            imageWidth={dayNightMapImageWidth}
          />
        </CenterContent>
      ),
    },
    {
      tabText: 'Weather',
      tabContent: (
          <TelescopeDetailsWeatherTabs
            obsId={obsId}
            miniWeatherPanelWidgetId={MiniWeatherPanelWidgetId}
            satelliteWidgetId={SatelliteWidgetId}
            weatherConditionsWidgetId={WeatherConditionsWidgetId}
            missionControlStatusWidgetId={MissionControlStatusWidgetId}
          />
      ),
    },
    {
      tabText: 'All Sky Camera',
      tabContent: (
        <CenterContent>
          <h1 style={inlineTitleStyle}>{allSkyCamTitle}</h1>
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
          <h1 style={inlineTitleStyle}>{domeCamTitle}</h1>
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
            facilityWebcamWidgetId={FacilityWebcamWidgetId}
          />
        </CenterContent>
      ),
    },
  ]
  );
}
