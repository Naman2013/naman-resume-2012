import React from 'react';
import CenterContent from '../../../design-system/CenterContent';
import WeatherForecastWidget from '../weather-forecast-widget';
import SatelliteWidget from '../weather-satellite-widget';
import WeatherConditionsWidget from '../weather-conditions-widget';
import MissionControlStatusWidget from '../weather-mission-control-status-widget';

const inlineTitleStyle = {
  color: 'white',
}

export default function generateWeatherTabConfiguration({
  obsId,
  miniWeatherPanelWidgetId,
  satelliteWidgetId,
  weatherConditionsWidgetId,
  missionControlStatusWidgetId,
}) {
  return (
  [
    {
      tabText: 'Forecast',
      tabContent: (
        <CenterContent>
          <WeatherForecastWidget obsId={obsId} miniWeatherPanelWidgetId={miniWeatherPanelWidgetId}/>
        </CenterContent>
      ),
    },
    {
      tabText: 'Current Conditions',
      tabContent: (
        <CenterContent>
          <WeatherConditionsWidget obsId={obsId} weatherConditionsWidgetId={weatherConditionsWidgetId}/>
        </CenterContent>
      ),
    },
    {
      tabText: 'Satellite',
      tabContent: (
        <CenterContent>
          <SatelliteWidget obsId={obsId} satelliteWidgetId={satelliteWidgetId}/>
        </CenterContent>
      ),
    },
    {
      tabText: 'Mission Status',
      tabContent: (
        <CenterContent>
          <MissionControlStatusWidget obsId={obsId} missionControlStatusWidgetId={missionControlStatusWidgetId }/>
        </CenterContent>
      ),
    },
  ]
  );
}
