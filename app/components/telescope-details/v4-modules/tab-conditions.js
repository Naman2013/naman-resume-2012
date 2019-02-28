import React from 'react';
import {
  Satellite,
  ConnectedAllSkyCamera,
  SkyConditions,
  WeatherConditions,
  MoonlightConditions,
  DayNightBar,
  DayNightMap,
  ImagePortalViewer,
  WeeklyForecast,
  ObsBotWidget,
} from './';
import { ModuleContainer } from './module-container';
import style from './tab-conditions.style';

const TabConditions = props => (
  <div>
    {console.log(props)}

    {props.currentTelescope.teleHasNeoView && <div className="tile-container">
      <ObsBotWidget {...props} ViewGroup="conditions"/>
    </div>
    }
    <div className="tile-container">
      <ConnectedAllSkyCamera obsId={props.obsId} allSkyWidgetID={props.AllskyWidgetId} />
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
      <WeeklyForecast />
    </div>

    <div className="tile-container">
      <Satellite />
    </div>
    <style jsx>{style}</style>
  </div>
);

export { TabConditions };
