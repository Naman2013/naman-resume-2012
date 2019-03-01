import { AboutScope } from 'app/modules/telescope/components/about-scope-tab';
import { StatusTab } from 'app/modules/telescope/components/status-tab';
import React, { Component } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './styles.scss';

export class TelescopeOffline extends Component {
  render() {
    // const {  } = this.props;
    return (
      <Container className="telescope-offline animated fadeIn faster">
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
                <StatusTab />
              </Tab>
              <Tab eventKey="QUEUE" title="QUEUE" disabled>
                QUEUE
              </Tab>
              <Tab eventKey="ABOUT_THIS_SCOPE" title="ABOUT THIS SCOPE">
                <AboutScope />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}
