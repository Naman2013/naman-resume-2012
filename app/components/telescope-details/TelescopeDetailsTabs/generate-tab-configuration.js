import React from 'react';
import DayNightBarPanel from '../condition-snapshot/DayNightBarPanel';
import DayNightMap from '../condition-snapshot/DayNightMap';
import LiveWebcam from '../live-webcam/live-webcam';
import CenterContent from '../../../design-system/CenterContent';
import AllSkyTabs from '../AllSkyTabs';
import DomeCamTabs from '../DomeCamTabs';
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
  AllskyWidgetId,
  AllskyTimelapseWidgetId,
  DomecamWidgetId,
  DomecamTimelapseWidgetId,
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
      tabText: 'All Sky',
      tabContent: (
        <AllSkyTabs
          obsId={obsId}
          AllskyWidgetId={AllskyWidgetId}
          AllskyTimelapseWidgetId={AllskyTimelapseWidgetId}
        />
      ),
    },
    {
      tabText: 'Dome',
      tabContent: (
        <DomeCamTabs
          obsId={obsId}
          DomecamWidgetId={DomecamWidgetId}
          DomecamTimelapseWidgetId={DomecamTimelapseWidgetId}
        />
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
