import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  DayNightBar,
  ObsBotWidget,
  ObservatoryInformation,
  WeatherConditions,
} from 'app/modules/telescope/components/old';
import { TelescopeOfflineWidget } from 'app/modules/telescope/components/old/telescope-offline-widget';
import { Box } from 'app/modules/telescope/components/box';
import { ConnectedAllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import './styles.scss';

export const StatusTab = props => {
  const {
    clockList,
    obsId,
    allSkyCam,
    allSkyWidgetID,
    currentTelescope,
    currentObservatory,
    facilityWebcam,
    domeCam,
    teidePeakCam,
    dayNightBarPanel,
    dayNightBar,
    skyConditions,
    observatoryList,
  } = props;

  return (
    <div className="animated fadeIn faster status-tab">
      <div className="telescope-views">
        <Container>
          <Row>
            <Col lg={4} md={12} sm={12}>
              <ConnectedAllSkyCamera
                obsId={obsId}
                allSkyWidgetID={allSkyWidgetID}
                imageURL={allSkyCam.allSkyCamURL}
                refreshIntervalSec={allSkyCam.allSkyRefreshIntervalSec}
                allSkyCamURL={allSkyCam.allSkyCamURL}
                offlineImageURL={allSkyCam.allSkyCamOfflineURL}
                onlineStatus={allSkyCam.allSkyCamOnlineStatus}
                AllskyTimelapseWidgetId={
                  currentObservatory.AllskyTimelapseWidgetId
                }
              />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <DomCameraWidget
                obsId={observatoryList[0]?.obsId}
                domeCam={domeCam}
                domeCamURL={domeCam.domeCamURL}
                activeTelescope={currentObservatory}
                widgetId={observatoryList[0]?.FacilityWebcamTimelapseWidgetId}
              />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <PicoDelTeidesWidget
                obsId={observatoryList[1]?.obsId}
                teidePeakCam={teidePeakCam}
                title={facilityWebcam.title}
                activeTelescope={currentTelescope}
                facilityWebcamUrl={facilityWebcam.facilityWebcamURL}
                observatoryData={currentObservatory}
                widgetId={observatoryList[1]?.FacilityWebcamTimelapseWidgetId}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col lg={8}>
            <TelescopeOfflineWidget
              {...props}
              shortFeed
              noScroll
              noCounter
              noDescription
              title="This Just In"
              ViewGroup="conditions"
              teleSystem={currentTelescope.teleSystem}
              clockList={clockList}
              missionControlStatusWidgetId={
                currentObservatory.MissionControlStatusWidgetId
              }
            />
            <ObsBotWidget
              {...props}
              shortFeed
              noScroll
              noCounter
              noDescription
              title="This Just In"
              ViewGroup="conditions"
              teleSystem={currentTelescope.teleSystem}
              clockList={clockList}
            />
          </Col>

          <Col lg={4}>
            <Box header="SKY CONDITIONS">
              {/*<div className="sky-cond">test</div>*/}
              <h4 className="h4-custom">{skyConditions.title}</h4>
              <h2 className="h2-custom">
                Level {skyConditions.seeingConditionsIndex}
              </h2>
              <p className="p-19">
                {skyConditions.seeingConditionsDescription}
              </p>
              {/* <hr /> */}
              {/* <h4 className="h4-custom">Measured FWHM Telemetry:</h4> */}
              {/* <h2 className="h2-custom">N.N Arcseconds</h2> */}
              {/* <hr /> */}
              {/* <h4 className="h4-custom">Transparency:</h4> */}
              {/* <h2 className="h2-custom">Moderate Haze</h2> */}
            </Box>

            <WeatherConditions obsId={obsId} />

            {dayNightBar.dayNightRawData && (
              <DayNightBar
                dayNightBarPanelURL={dayNightBarPanel.dayNightBarPanelURL}
                dayNightBar={dayNightBar}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
