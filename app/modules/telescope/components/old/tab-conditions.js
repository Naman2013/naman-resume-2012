import React from 'react';
import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import {
  Satellite,
  ConnectedAllSkyCamera,
  SkyConditions,
  WeatherConditions,
  DayNightBar,
  DayNightMap,
  WeeklyForecast,
  ObsBotWidget,
} from './index';
import { MoonlightConditions } from '../../moonlight-conditions/moonlight-conditions-container';
import style from './tab-conditions.style';

const TabConditions = props => {
  const {
    currentTelescope,
    currentObservatory,
    dayNightBarPanel,
    dayNightMap,
    domeCam,
    facilityWebcam,
    weatherSatellite,
  } = props;
  return (
    <div>
      {currentTelescope.teleHasNeoView && (
        <div className="tile-container">
          <ObsBotWidget {...props} ViewGroup="conditions" />
        </div>
      )}
      <div className="tile-container">
        <ConnectedAllSkyCamera
          obsId={currentObservatory.obsId}
          allSkyWidgetID={currentObservatory.AllskyWidgetId}
          AllskyTimelapseWidgetId={currentObservatory.AllskyTimelapseWidgetId}
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
          dayNightBarPanelURL={dayNightBarPanel.dayNightBarPanelURL}
        />
      </div>

      <div className="tile-container">
        <DayNightMap dayNightMapURL={dayNightMap.dayNightMapURL} />
      </div>

      <div className="tile-container">
        <DomCameraWidget domeCamURL={domeCam.domeCamURL} {...props} />
      </div>

      <div className="tile-container">
        <PicoDelTeidesWidget
          {...props}
          title={facilityWebcam.title}
          facilityWebcamUrl={facilityWebcam.facilityWebcamURL}
        />
      </div>

      <div className="tile-container">
        <WeeklyForecast />
      </div>

      <div className="tile-container">
        <Satellite satelliteImageURL={weatherSatellite.satelliteImageURL} />
      </div>
      <style jsx>{style}</style>
    </div>
  );
};

export { TabConditions };
