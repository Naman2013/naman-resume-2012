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
    weatherConditions,
    observatoryList,
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
        <DomCameraWidget
          domeCamURL={domeCam.domeCamURL}
          {...props}
          obsId={observatoryList[0]?.obsId}
          widgetId={currentObservatory.DomecamTimelapseWidgetId}
        />
      </div>

      <div className="tile-container">
        <PicoDelTeidesWidget
          {...props}
          obsId={currentObservatory.obsId}
          widgetId={currentObservatory.FacilityWebcamTimelapseWidgetId}
          title={facilityWebcam.title}
          facilityWebcamUrl={facilityWebcam.facilityWebcamURL}
        />
      </div>

      <div className="tile-container">
        {weatherConditions.forecastList && (
          <WeeklyForecast forecastList={weatherConditions.forecastList} />
        )}
      </div>

      <div className="tile-container">
        <Satellite satelliteImageURL={weatherSatellite.satelliteImageURL} />
      </div>
      <style jsx>{style}</style>
    </div>
  );
};

export { TabConditions };
