import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TimeUtc from 'app/atoms/time-utc';
import Button from 'app/components/common/style/buttons/Button';
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
  const {
    obsOpensLabel,
    obsOpenDisplayTime,
    obsOpenDisplayTimeZone,
    obsOpenDisplayOtherTimeZones,
    obsTimeInLabel,
    obsCurrentDisplayTime,
    obsCurrentDisplayOtherTimeZones,
  } = clockList;
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
            <Box header="OBSERVATORY INFORMATION">
              <div className="box-cols">
                <div>
                  <h4 className="h4-custom">{obsOpensLabel}</h4>
                  <TimeUtc
                    time={obsOpenDisplayTime}
                    timeZone={obsOpenDisplayTimeZone}
                  />
                  <TimeUtc small time={obsOpenDisplayOtherTimeZones} />
                </div>
                <div>
                  <h4 className="h4-custom">{obsTimeInLabel}</h4>
                  <TimeUtc
                    time={obsCurrentDisplayTime}
                    timeZone={obsOpenDisplayTimeZone}
                  />
                  <TimeUtc small time={obsCurrentDisplayOtherTimeZones} />
                </div>
              </div>
            </Box>

            <Box header="THIS JUST IN!">
              <Row>
                <Col sm>
                  <h4 className="h4-custom">MOON RISING</h4>
                </Col>
                <Col sm className="text-right">
                  <h4 className="h4-custom">1 HOUR AGO</h4>
                </Col>
              </Row>

              <p className="p-19">
                The Moon is rising at the Canary Islands Observatory!
              </p>

              <hr />

              <Row>
                <Col sm>
                  <h4 className="h4-custom">TELESCOPE ALERT</h4>
                </Col>
                <Col sm className="text-right">
                  <h4 className="h4-custom">3 HOURS AGO</h4>
                </Col>
              </Row>
              <h2 className="h2-custom">Canary One is down to Weather</h2>
              <p className="p-19">
                Sometimes these things happen. If you had a Mission scheduled
                for this time, you’re account will be credited.
              </p>
              <Button text="FIND ANOTHER MISSION" onClickEvent={() => {}} />
            </Box>
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
