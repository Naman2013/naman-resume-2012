import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  ObsBotWidget,
  ObservatoryInformation,
} from 'app/modules/telescope/components/old';
import { Box } from 'app/modules/telescope/components/box';
import { AllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
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
  } = props;
  return (
    <div className="animated fadeIn faster status-tab">
      <div className="telescope-views">
        <Container>
          <Row>
            <Col lg={4} md={12} sm={12}>
              <AllSkyCamera
                obsId={obsId}
                allSkyWidgetID={allSkyWidgetID}
                imageURL={allSkyCam.allSkyCamURL}
                refreshIntervalSec={allSkyCam.allSkyRefreshIntervalSec}
                allSkyCamURL={allSkyCam.allSkyCamURL}
                offlineImageURL={allSkyCam.allSkyCamOfflineURL}
                onlineStatus={allSkyCam.allSkyCamOnlineStatus}
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
                domeCam={domeCam}
                title={facilityWebcam.title}
                activeTelescope={currentTelescope}
                facilityWebcamUrl={facilityWebcam.facilityWebcamURL}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col lg={8}>
            <ObservatoryInformation clockList={clockList} />
            <ObsBotWidget
              {...props}
              shortFeed
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

              <h4 className="h4-custom">Measured FWHM Telemetry:</h4>
              <h2 className="h2-custom">N.N Arcseconds</h2>
              <hr />

              <h4 className="h4-custom">Transparency:</h4>
              <h2 className="h2-custom">Moderate Haze</h2>
            </Box>

            <Box header="WEATHER CONDITIONS">
              <div className="weather">
                <Row>
                  <Col>
                    <h4 className="h4-custom">Temperature</h4>
                  </Col>
                  <Col>
                    <h2 className="h2-custom temp-value">67° F</h2>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col>
                    <h4 className="h4-custom">Dew Point</h4>
                  </Col>
                  <Col>
                    <h2 className="h2-custom temp-value">57° F</h2>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col>
                    <h4 className="h4-custom">Humidity</h4>
                  </Col>
                  <Col>
                    <h2 className="h2-custom temp-value">69%</h2>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col>
                    <h4 className="h4-custom">Temperature</h4>
                  </Col>
                  <Col>
                    <h2 className="h2-custom temp-value">67° F</h2>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col>
                    <h4 className="h4-custom">Temperature</h4>
                  </Col>
                  <Col>
                    <h2 className="h2-custom temp-value">67° F</h2>
                  </Col>
                </Row>
              </div>
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
