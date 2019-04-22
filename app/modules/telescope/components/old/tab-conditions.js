import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import React from 'react';
import {
  Satellite,
  ConnectedAllSkyCamera,
  SkyConditions,
  WeatherConditions,
  DayNightBar,
  DayNightMap,
  ImagePortalViewer,
  WeeklyForecast,
  ObsBotWidget,
} from './index';
import { MoonlightConditions } from '../../moonlight-conditions/moonlight-conditions-container';
import { ModuleContainer } from './module-container';
import style from './tab-conditions.style';

const TabConditions = props => (
  <div>
    {props.currentTelescope.teleHasNeoView && (
      <div className="tile-container">
        <ObsBotWidget {...props} ViewGroup="conditions" />
      </div>
    )}
    <div className="tile-container">
      <ConnectedAllSkyCamera
        obsId={props.obsId}
        allSkyWidgetID={props.AllskyWidgetId}
      />
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
      <DayNightBar
        dayNightBarPanelURL={props.dayNightBarPanel.dayNightBarPanelURL}
        dayNightBar={props.dayNightBar}
      />
    </div>

    <div className="tile-container">
      <DayNightMap dayNightMapURL={props.dayNightMap.dayNightMapURL} />
    </div>

    <div className="tile-container">
      <DomCameraWidget domeCamURL={props.domeCam.domeCamURL} {...props} />
    </div>

    <div className="tile-container">
      <PicoDelTeidesWidget
        facilityWebcamUrl={props.facilityWebcam.facilityWebcamURL}
        title={props.facilityWebcam.title}
        {...props}
      />
    </div>

    <div className="tile-container">
      <WeeklyForecast />
    </div>

    <div className="tile-container">
      <Satellite satelliteImageURL={props.weatherSatellite.satelliteImageURL} />
    </div>
    <style jsx>{style}</style>
  </div>
);

export { TabConditions };
