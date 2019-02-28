import React, { Component } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './styles.scss';

export class TelescopeOffline extends Component {
  render() {
    // const {  } = this.props;
    return (
      <Container className="telescope-offline">
        <Row>
          <Col>
            <h1>Canary One: Offline</h1>
            <hr />
            <Tabs
              defaultActiveKey="STATUS"
              id="tabs"
              unmountOnExit
              mountOnEnter
            >
              <Tab eventKey="STATUS" title="STATUS">
                STATUS
              </Tab>
              <Tab eventKey="QUEUE" title="QUEUE" disabled>
                QUEUE
              </Tab>
              <Tab eventKey="ABOUT_THIS_SCOPE" title="ABOUT THIS SCOPE">
                ABOUT THIS SCOPE
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}
