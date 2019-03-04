import { Box } from 'app/modules/telescope/components/box';
import { TimeUtc } from 'app/modules/telescope/components/time-utc';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './styles.scss';

export const StatusTab = props => {
  // const {  } = props;
  return (
    <div className="animated fadeIn faster status-tab">
      <Row>
        <Col md={8}>
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
            <h4 className="h4-custom">MOON RISING</h4>
            <p className="p19">
              The Moon is rising at the Canary Islands Observatory!
            </p>
            <hr />
            <h4 className="h4-custom">TELESCOPE ALERT</h4>
            <h2 className="h2-custom">Canary One is down to Weather</h2>
            <p className="p19">
              Sometimes these things happen. If you had a Mission scheduled for
              this time, you’re account will be credited.
            </p>
            <hr />
          </Box>
          <Box header="NEEDS A TITLE">
            <div>test</div>
          </Box>
        </Col>
        <Col md={4}>
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
    </div>
  );
};
