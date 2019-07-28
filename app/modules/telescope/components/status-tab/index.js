import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  ObsBotWidget,
  ObservatoryInformation,
  WeatherConditions,
} from 'app/modules/telescope/components/old';
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
                domeCam={domeCam}
                domeCamURL={domeCam.domeCamURL}
                activeTelescope={currentObservatory}
              />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <PicoDelTeidesWidget
                obsId={obsId}
                teidePeakCam={teidePeakCam}
                title={facilityWebcam.title}
                activeTelescope={currentTelescope}
                facilityWebcamUrl={facilityWebcam.facilityWebcamURL}
                observatoryData={currentObservatory}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col lg={8}>
            <ObservatoryInformation clockList={clockList} compactMode />
            <ObsBotWidget
              {...props}
              shortFeed
              noScroll
              noCounter
              noDescription
              title="This Just In"
              ViewGroup="conditions"
              teleSystem={currentTelescope.teleSystem}
            />
          </Col>

          <Col lg={4}>
            <Box header="SKY CONDITIONS">
              {/*<div className="sky-cond">test</div>*/}
              <h4 className="h4-custom">SEEING CONDITIONS:</h4>
              <h2 className="h2-custom">Level 3</h2>
              <p className="p-19">
                Almost continuous distortion with occasional brief good moments.
              </p>
              <hr />

              {/* <h4 className="h4-custom">Measured FWHM Telemetry:</h4> */}
              <h2 className="h2-custom">N.N Arcseconds</h2>
              <hr />

              <h4 className="h4-custom">Transparency:</h4>
              <h2 className="h2-custom">Moderate Haze</h2>
            </Box>

            <WeatherConditions obsId={obsId} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
