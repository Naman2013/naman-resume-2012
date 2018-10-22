import React from 'react';
import {
  Satellite,
  AllSkyCamera,
  SkyConditions,
  WeatherConditions,
  MoonlightConditions,
  DayNightBar,
  DayNightMap,
  ImagePortalViewer,
} from './';
import { ModuleContainer } from './module-container';
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
      <DayNightBar />
    </div>

    <div className="tile-container">
      <DayNightMap />
    </div>

    <div className="tile-container">
      <ModuleContainer title="Dome view">
        <ImagePortalViewer imageURL="" />
      </ModuleContainer>
    </div>

    <div className="tile-container">
      <ModuleContainer title="Pico del teide cam">
        <ImagePortalViewer imageURL="" />
      </ModuleContainer>
    </div>

    <div className="tile-container">
      <Satellite />
    </div>
    <style jsx>{style}</style>
  </div>
);

export { TabConditions };
