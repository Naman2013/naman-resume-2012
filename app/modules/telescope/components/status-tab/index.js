import { Box } from 'app/modules/telescope/components/box';
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
            <div>test</div>
          </Box>
        </Col>
        <Col md={4}>
          <Box header="SKY CONDITIONS">
            <div>test</div>
          </Box>
        </Col>
      </Row>
    </div>
  );
};
