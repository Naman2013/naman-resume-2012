import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'app/components/common/style/buttons/Button';
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
    allSkyWidgetID,
    currentTelescope,
    currentObservatory,
  } = props;
  return (
    <div className="animated fadeIn faster status-tab">
      <div className="telescope-views">
        <Container>
          <Row>
            <Col lg={4} md={12} sm={12}>
              <AllSkyCamera
                obsId={obsId}
                imageURL={currentTelescope.teleOfflineImgURL}
                allSkyWidgetID={allSkyWidgetID}
              />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <DomCameraWidget
                obsId={obsId}
                activeTelescope={currentObservatory}
              />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <PicoDelTeidesWidget
                obsId={obsId}
                title="TEIDE PEAK WEBCAM"
                activeTelescope={currentObservatory}
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
