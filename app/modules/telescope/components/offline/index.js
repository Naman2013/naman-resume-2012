import React, { Component } from 'react';
import { AboutScope } from 'app/modules/telescope/components/about-scope-tab';
import { StatusTab } from 'app/modules/telescope/components/status-tab';
import { Container, Nav, Tab } from 'react-bootstrap';
import './styles.scss';

export default class TelescopeOffline extends Component {
  componentDidMount = () => {
    const {
      fetchAllWidgets,
      currentTelescope,
      currentObservatory,
      fetchWeatherSatellite,
      fetchDomeCamAction,
      fetchObservatoryWebcam,
    } = this.props;
    const {
      DayNightBarPanelWidgetId,
      obsId,
      DayNightMapWidgetId,
      SatelliteWidgetId,
      DomecamWidgetId,
      FacilityWebcamWidgetId,
      AllskyWidgetId,
    } = currentObservatory;
    fetchAllWidgets({
      obsId,
      DayNightBarPanelWidgetId,
      DayNightMapWidgetId,
      AllskyWidgetId,
      DomecamWidgetId,
    });
    fetchWeatherSatellite({ obsId, SatelliteWidgetId });
    fetchDomeCamAction({ obsId, DomecamWidgetId });
    fetchObservatoryWebcam({
      obsId,
      facilityWebcamWidgetId: FacilityWebcamWidgetId,
    });
  };

  render() {
    const {
      domeCam,
      allSkyCam,
      facilityWebcam,
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
              <StatusTab
                domeCam={domeCam}
                allSkyCam={allSkyCam}
                facilityWebcam={facilityWebcam}
                obsId={currentObservatory.obsId}
                allSkyWidgetID={currentObservatory.AllskyWidgetId}
                clockList={allObservatoryTelescopeStatus.clockList}
                currentTelescope={currentTelescope}
                currentObservatory={currentObservatory}
              />
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
