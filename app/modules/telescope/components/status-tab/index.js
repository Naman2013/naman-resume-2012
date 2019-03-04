import Button from 'app/components/common/style/buttons/Button';
import { Box } from 'app/modules/telescope/components/box';
import { TelescopeViewWrapper } from 'app/modules/telescope/components/telescope-view-wrapper';
import { TimeUtc } from 'app/modules/telescope/components/time-utc';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './styles.scss';

export const StatusTab = props => {
  // const {  } = props;
  return (
    <div className="animated fadeIn faster status-tab">
      <div className="telescope-views">
        <Container>
          <TelescopeViewWrapper />
        </Container>
      </div>

      <Container>
        <Row>
          <Col lg={8}>
            <Box header="OBSERVATORY INFORMATION">
              <div className="box-cols">
                <div>
                  <h4 className="h4-custom">Observatory ONLINE:</h4>
                  <TimeUtc time="00:00:00" />
                </div>
                <div>
                  <h4 className="h4-custom">TIME IN CANARY ISLANDS:</h4>
                  <TimeUtc time="00:00:00" />
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

            <Box header="NEEDS A TITLE">
              <div>test</div>
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
              <h4 className="h4-custom">Temperature</h4>
              <h2 className="h2-custom float-right">67° F</h2>
              <hr />

              <h4 className="h4-custom">Dew Point</h4>
              <h2 className="h2-custom float-right">57° F</h2>
              <hr />

              <h4 className="h4-custom">Dew Point</h4>
              <h2 className="h2-custom float-right">67° F</h2>
              <hr />

              <h4 className="h4-custom">Temperature</h4>
              <h2 className="h2-custom float-right">67° F</h2>
              <hr />

              <h4 className="h4-custom">Temperature</h4>
              <h2 className="h2-custom float-right">67° F</h2>
              <hr />
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
