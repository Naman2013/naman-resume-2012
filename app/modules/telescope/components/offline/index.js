import React, { Component } from 'react';
import { AboutScope } from 'app/modules/telescope/components/about-scope-tab';
import { StatusTab } from 'app/modules/telescope/components/status-tab';
import { Container, Nav, Tab } from 'react-bootstrap';
import './styles.scss';

export class TelescopeOffline extends Component {
  render() {
    const {
      currentTelescope,
      currentObservatory,
      currentInstrument,
      allObservatoryTelescopeStatus,
    } = this.props;
    return (
      <div className="telescope-offline animated fadeIn faster">
        {/* HEADER */}
        <Container>
          <h1 className="h1-custom">{currentTelescope.teleName}: Offline</h1>
          <hr />
        </Container>

        {/* TABS */}
        <Tab.Container
          defaultActiveKey="STATUS"
          id="tabs"
          unmountOnExit
          mountOnEnter
        >
          {/* TABS NAVS */}
          <Container>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="STATUS">STATUS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="QUEUE" disabled>
                  QUEUE
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ABOUT_THIS_SCOPE">
                  ABOUT THIS SCOPE
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>

          {/* TABS CONTENT */}
          <Tab.Content>
            <Tab.Pane eventKey="STATUS">
              <StatusTab clockList={allObservatoryTelescopeStatus.clockList} />
            </Tab.Pane>
            <Tab.Pane eventKey="ABOUT_THIS_SCOPE">
              <AboutScope
                teleName={currentTelescope.teleName}
                obsHeroURL={currentObservatory.obsHeroURL}
                obsShortName={currentObservatory.obsShortName}
                obsDescription={currentObservatory.obsDescription}
                instrAbout={currentInstrument.instrAbout}
                instrRelatedGuideUrl={currentInstrument.instrRelatedGuideUrl}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}
