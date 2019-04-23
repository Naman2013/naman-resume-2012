import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  ObsBotWidget,
  ObservatoryInformation,
} from 'app/modules/telescope/components/old';
import { Box } from 'app/modules/telescope/components/box';
import { ConnectedAllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import { MissionsList } from 'app/modules/missions/components/missions-list';
import './styles.scss';

export class QueueTab extends Component {
  componentDidMount(){
    this.getUpcomingSlotsByTelescope();
  }

  getUpcomingSlotsByTelescope = () => {
    const { getUpcomingSlotsByTelescope, currentTelescope, currentObservatory } = this.props;
    getUpcomingSlotsByTelescope({
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
    });
  }

  render(){
    const {
      upcomingSlotsData,
    } = this.props;
    const { missionList, reservationDateFormatted, showShowMoreButton, showMoreButtonCaption } = upcomingSlotsData;
    console.log(upcomingSlotsData);
    return (
      <div className="animated fadeIn faster queue-tab">
        <Container>
          <MissionsList 
            selectedDate={{ reservationDateFormatted }}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
            showShowMoreButton={showShowMoreButton}
            showMoreButtonCaption={showMoreButtonCaption}
          />
        </Container>
      </div>
  )};

};
