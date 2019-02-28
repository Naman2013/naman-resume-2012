import React from 'react';
import { ModuleContainer, SimpleList } from './index';

const data = [
  { title: 'Temperature', field: '67F' },
  { title: 'Dew point', field: '57F' },
  { title: 'Humidity', field: '69%' },
  { title: 'Wind speed', field: '0 mph' },
  { title: 'Wind gusts', field: '0 mph' },
];

const WeatherConditions = () => (
  <ModuleContainer title="Weather conditions">
    <SimpleList data={data} />
  </ModuleContainer>
);

export { WeatherConditions };
