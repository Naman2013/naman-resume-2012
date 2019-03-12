import { TelescopeView } from 'app/modules/telescope/components/telescope-view-item';
import React from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import './styles.scss';

export const TelescopeViewWrapper = props => {
  // const {  } = props;
  return (
    <div className="telescope-view-wrapper">
      {/* MOBILE VIEW */}
      <div className="d-block d-sm-none">
        <Carousel indicators={false} interval={null} nextIcon=">" prevIcon="<">
          <Carousel.Item>
            <TelescopeView title="DOME VIEW" key="DOME VIEW" />
          </Carousel.Item>
          <Carousel.Item>
            <TelescopeView title="ALL SKY CAMERA" key="ALL SKY CAMERA" />
          </Carousel.Item>
          <Carousel.Item>
            <TelescopeView title="HORIZON VIEW" key="DOME VIEW" />
          </Carousel.Item>
          <Carousel.Item>
            <TelescopeView title="DOME VIEW" key="ALL SKY CAMERA" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* TABLET DESKTOP VIEW */}
      <div className="d-none d-sm-block">
        <Row>
          <Col sm>
            <TelescopeView title="DOME VIEW" key="DOME VIEW" />
          </Col>
          <Col sm>
            <TelescopeView title="ALL SKY CAMERA" key="ALL SKY CAMERA" />
          </Col>
          <Col sm>
            <TelescopeView title="HORIZON VIEW" key="HORIZON VIEW" />
          </Col>
          <Col sm>
            <TelescopeView title="DOME VIEW" key="DOME VIEW" />
          </Col>
        </Row>
      </div>
    </div>
  );
};
