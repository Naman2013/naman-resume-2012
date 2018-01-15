import React from 'react';
import CenterContent from '../../../design-system/CenterContent';
import WeatherForecastWidget from '../weather-forecast-widget';
import SatelliteWidget from '../weather-satellite-widget';
import WeatherConditionsWidget from '../weather-conditions-widget';

const inlineTitleStyle = {
  color: 'white',
}

export default function generateWeatherTabConfiguration({
  obsId,
  miniWeatherPanelWidgetId,
  satelliteWidgetId,
  weatherConditionsWidgetId,
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
      tabText: 'Satellite',
      tabContent: (
        <CenterContent>
          <SatelliteWidget obsId={obsId} satelliteWidgetId={satelliteWidgetId}/>
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
  ]
  );
}
