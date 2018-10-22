import React from 'react';
import {
  Satellite,
  AllSkyCamera,
  SkyConditions,
  WeatherConditions,
  MoonlightConditions,
} from './';
import style from './tab-live.style';

const TabConditions = () => (
  <div>
    <div className="tile-container">
      <AllSkyCamera />
    </div>

    <div className="tile-container">
      <SkyConditions />
    </div>

    <div className="tile-container">
      <WeatherConditions />
    </div>

    <div className="tile-container">
      <MoonlightConditions />
    </div>

    <div className="tile-container">
      <Satellite />
    </div>
    <style jsx>{style}</style>
  </div>
);

export { TabConditions };
