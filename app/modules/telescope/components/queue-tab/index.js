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
import { ReservationModal } from 'app/modules/missions/components/telescope-reservation/reservation-modal';
import { Spinner } from 'app/components/spinner/index';
import { setupMissionListTimer, stopMissionListTimer} from 'app/services/missions/timer';
import { FeaturedObjects } from '../featured-objects';
import './styles.scss';

export class QueueTab extends Component {
  state = {
    reservationModalVisible: false,
  };

  componentDidMount(){
    const { setTelescope, currentTelescope, currentObservatory, showFeaturedObjects } = this.props;
    if (showFeaturedObjects) {
      this.getFeaturedObjectsByTelescope();
    }
    this.getUpcomingSlotsByTelescope();
    setTelescope({
      ...currentTelescope,
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
    });
  }

  componentWillUnmount() {
    stopMissionListTimer();
  }

  getUpcomingSlotsByTelescope = requestedSlotCount => {
    const { getUpcomingSlotsByTelescope, currentTelescope, currentObservatory } = this.props;
    stopMissionListTimer();
    getUpcomingSlotsByTelescope({
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
      requestedSlotCount,
    }).then(data => setupMissionListTimer(data.payload.refreshIntervalSec * 1000, () => this.getUpcomingSlotsByTelescope(requestedSlotCount)));
  }

  getFeaturedObjectsByTelescope = () => {
    const { getFeaturedObjectsByTelescope, currentTelescope, currentObservatory } = this.props;
    getFeaturedObjectsByTelescope({
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
    });
  }

  showMore = () => {
    const { upcomingSlotsData } = this.props;
    const { requestedSlotCount, showMoreSlotsIncrement } = upcomingSlotsData;
    this.getUpcomingSlotsByTelescope(requestedSlotCount + showMoreSlotsIncrement);
  }

  getTelescopeSlot = mission => {
    const { getTelescopeSlot, setSelectedSlot } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    setSelectedSlot(mission);
    getTelescopeSlot({
      finalizeReservation: false,
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationModalVisible: true }));
  };

  reservationModalHide = () => {
    const { cancelMissionSlot, selectedSlot, upcomingSlotsData } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;
    const { requestedSlotCount } = upcomingSlotsData;
    cancelMissionSlot({
      callSource: 'byTelescopeV4',
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.getUpcomingSlotsByTelescope(requestedSlotCount));
    this.setState({ reservationModalVisible: false });
  };

  reservationComplete = () => {
    const { upcomingSlotsData } = this.props;
    const { requestedSlotCount } = upcomingSlotsData;
    this.getUpcomingSlotsByTelescope(requestedSlotCount);
    this.setState({ reservationModalVisible: false });
  };

  render(){
    const {
      upcomingSlotsData,
      isFetching,
      mobileMissionList,
      featuredObjectsData,
      currentTelescope,
      showFeaturedObjects,
      user,
      reservedCommunityMissionData,
      reserveCommunityMission,
      reservedCommunityMission,
    } = this.props;
    
    const { missionList, reservationDateFormatted, showShowMoreButton, showMoreButtonCaption } = upcomingSlotsData;
    const { reservationModalVisible } = this.state;

    return (
      <div className={`animated fadeIn faster queue-tab${
        mobileMissionList ? ' mobile-missions-list' : ''
      }`}>
        <Container>
          <Spinner
            loading={isFetching}
          />

          {showFeaturedObjects && featuredObjectsData.showFeaturedObjects && (
            <FeaturedObjects 
              featuredObjectsData={featuredObjectsData}
              currentTelescope={currentTelescope}
              user={user}
              reservedCommunityMissionData={reservedCommunityMissionData}
              reserveCommunityMission={reserveCommunityMission}
              reservedCommunityMission={reservedCommunityMission}
            />
          )}

          <MissionsList 
            selectedDate={{ reservationDateFormatted }}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
            showMore={this.showMore}
            showShowMoreButton={showShowMoreButton}
            showMoreButtonCaption={showMoreButtonCaption}
          />

          {reservationModalVisible && (
            <ReservationModal
              onHide={this.reservationModalHide}
              onComplete={this.reservationComplete}
              show
            />
          )}
        </Container>
      </div>
  )};

};
