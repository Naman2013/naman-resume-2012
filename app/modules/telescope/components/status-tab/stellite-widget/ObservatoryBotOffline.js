import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import '../styles.scss';
// eslint-disable-next-line import/no-cycle
import {
  DayNightMap,
  ObservatoryInformation,
  Satellite,
  WeeklyForecast,
} from 'app/modules/telescope/components/old';
// eslint-disable-next-line import/no-cycle
import { MoonlightConditions } from 'app/modules/telescope/moonlight-conditions/moonlight-conditions-container';
import MissionControlStatusWidget from 'app/components/telescope-details/weather-mission-control-status-widget';

export const ObservatoryBotOffline = props => {
  const {
    weatherSatellite,
    weatherConditions,
    dayNightMap,
    clockList,
    obsId,
    missionControlStatusWidgetId,
  } = props;

  return (
    <div className="observatory-offline">
      <Tab.Container
        defaultActiveKey="TIME"
        id="tabs"
        unmountOnExit
        mountOnEnter
      >
        {/* TABS NAVS */}
        <Container>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="TIME">TIME</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="STATUS_REPORT">STATUS REPORT</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="SATELLITE">SATELLITE</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="WEEKLY_FORECAST">WEEKLY FORECAST</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="DAY_NIGHT_MAP">DAY/NIGHT MAP</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="MOONLIGHT">MOONLIGHT</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
        <Tab.Content>
          <Tab.Pane eventKey="TIME">
            <ObservatoryInformation
              clockList={clockList}
              compactMode
              hideHeader
            />
          </Tab.Pane>
          <Tab.Pane eventKey="STATUS_REPORT">
            <MissionControlStatusWidget
              obsId={obsId}
              missionControlStatusWidgetId={missionControlStatusWidgetId}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="SATELLITE">
            <Satellite
              satelliteImageURL={weatherSatellite.satelliteImageURL}
              hideHeader
            />
          </Tab.Pane>
          <Tab.Pane eventKey="WEEKLY_FORECAST">
            <WeeklyForecast
              forecastList={weatherConditions.forecastList}
              hideHeader
            />
          </Tab.Pane>
          <Tab.Pane eventKey="DAY_NIGHT_MAP">
            <DayNightMap
              dayNightMapURL={dayNightMap.dayNightMapURL}
              hideHeader
            />
          </Tab.Pane>
          <Tab.Pane eventKey="MOONLIGHT">
            <MoonlightConditions hideHeader />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

ObservatoryBotOffline.propTypes = {
  weatherSatellite: PropTypes.object.isRequired,
  weatherConditions: PropTypes.object.isRequired,
  dayNightMap: PropTypes.object.isRequired,
  clockList: PropTypes.object.isRequired,
  obsId: PropTypes.string.isRequired,
  missionControlStatusWidgetId: PropTypes.string.isRequired,
};
