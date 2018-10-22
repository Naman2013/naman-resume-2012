import React from 'react';
import { ModuleContainer } from './';
import style from './weather-conditions.style';

const data = [
  { title: 'Temperature', field: '67F' },
  { title: 'Dew point', field: '57F' },
  { title: 'Humidity', field: '69%' },
  { title: 'Wind speed', field: '0 mph' },
  { title: 'Wind gusts', field: '0 mph' },
];

const WeatherConditions = () => (
  <ModuleContainer title="Weather conditions">
    <ul className="data-set">
      {
        data.map(measurement => (
          <li className="node">
            <ul className="datum">
              <li className="title">{measurement.title}</li>
              <li className="field">{measurement.field}</li>
            </ul>
          </li>
        ))}
    </ul>
    <style jsx>{style}</style>
  </ModuleContainer>
);

export { WeatherConditions };
