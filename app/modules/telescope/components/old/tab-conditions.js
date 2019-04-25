import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import React from 'react';
import { MoonlightConditions } from '../../moonlight-conditions/moonlight-conditions-container';
import {
  ConnectedAllSkyCamera,
  DayNightBar,
  DayNightMap,
  ObsBotWidget,
  Satellite,
  SkyConditions,
  WeatherConditions,
  WeeklyForecast,
} from './index';
import style from './tab-conditions.style';

const TabConditions = props => {
  const {
    currentTelescope,
    currentObservatory,
    dayNightBarPanel,
    dayNightBar,
    dayNightMap,
    domeCam,
    facilityWebcam,
    weatherSatellite,
  } = props;
  const { SeeingConditionsWidgetId, obsId } = currentObservatory;
  return (
    <div>
      {currentTelescope.teleHasNeoView && (
        <div className="tile-container">
          <ObsBotWidget {...props} ViewGroup="conditions" />
        </div>
      )}
      <div className="tile-container">
        <ConnectedAllSkyCamera
          obsId={obsId}
          allSkyWidgetID={currentObservatory.AllskyWidgetId}
          AllskyTimelapseWidgetId={currentObservatory.AllskyTimelapseWidgetId}
        />
      </div>

      <div className="tile-container">
        <SkyConditions widgetID={SeeingConditionsWidgetId} obsId={obsId} />
      </div>

      <div className="tile-container">
        <WeatherConditions obsId={obsId} />
      </div>

      <div className="tile-container">
        <MoonlightConditions />
      </div>

      <div className="tile-container">
        <DayNightBar
          dayNightBarPanelURL={dayNightBarPanel.dayNightBarPanelURL}
          dayNightBar={dayNightBar}
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
