import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Box } from 'app/modules/telescope/components/box';
import { ConnectedAllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import { MissionsList } from 'app/modules/missions/components/missions-list';
import { ReservationModal } from 'app/modules/missions/components/telescope-reservation/reservation-modal';
import { Spinner } from 'app/components/spinner/index';
import { setupMissionListTimer, stopMissionListTimer} from 'app/services/missions/timer';
import { FeaturedObjects } from '../featured-objects';
import { FeaturedObjectsModal } from '../featured-objects-modal';
import { MissionSuccessModal } from '../../../missions/components/mission-success-modal';
import './styles.scss';

export class QueueTab extends Component {
  state = {
    reservationModalVisible: false,
    reservationPiggybackVisible: false,
    successModalShow: false,
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
    const { getUpcomingSlotsByTelescope, currentTelescope, currentObservatory, missionsRefreshTimerEnabled, offlineQueueTab } = this.props;
    stopMissionListTimer();
    getUpcomingSlotsByTelescope({
      callSource: offlineQueueTab ? 'offlineQueue' : 'onlineQueue',
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
      requestedSlotCount,
    }).then(data => {
      if( missionsRefreshTimerEnabled && offlineQueueTab ) {
        setupMissionListTimer(data.payload.refreshIntervalSec * 1000, () => this.getUpcomingSlotsByTelescope(requestedSlotCount))
      }
    });
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

  getTelescopeSlot = (mission, finalizeReservation = false) => {
    const { getTelescopeSlot, setSelectedSlot } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    setSelectedSlot(mission);
    getTelescopeSlot({
      finalizeReservation: finalizeReservation,
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationModalVisible: true }));
  };

  grabPiggyback = mission => {
    const { grabPiggyback } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    grabPiggyback({
      callSource: 'byTelescopeV4',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationPiggybackVisible: true }));
  };
  
  reservePiggyback = () => {
    const { reservePiggyback, piggyBackMissionSlot } = this.props;
    const {
      scheduledMissionId,
      uniqueId,
      title,
      objectIconURL,
      missionStart,
      missionType,
      obsName,
      telescopeName,
    } = piggyBackMissionSlot;

    reservePiggyback({
      callSource: 'byTelescopeV4',
      scheduledMissionId,
      uniqueId,
      title,
      objectIconURL,
      missionStart,
      missionType,
      obsName,
      telescopeName,
    }).then(() =>
      this.setState({
        successModalShow: true,
        reservationPiggybackVisible: false,
      })
    );
  };

  reservationModalHide = (cancelMission = true) => {
    const { cancelMissionSlot, selectedSlot, upcomingSlotsData } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;
    const { requestedSlotCount } = upcomingSlotsData;
    if (cancelMission) {
      cancelMissionSlot({
        callSource: 'byTelescopeV4',
        grabType: 'notarget',
        scheduledMissionId,
        uniqueId,
      }).then(() => this.getUpcomingSlotsByTelescope(requestedSlotCount));
    } else {
      this.getUpcomingSlotsByTelescope(requestedSlotCount);
    }
    this.setState({
      reservationModalVisible: false,
      reservationPiggybackVisible: false,
      successModalShow: false,
    });
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
      pageSetup,
      piggyBackMissionSlot,
      piggybackReservedMissionData,
      piggybackReservedMission,
    } = this.props;
    
    const { missionList, reservationDateFormatted, showShowMoreButton, showMoreButtonCaption, requestedSlotCount } = upcomingSlotsData;
    const { 
      reservationModalVisible,
      reservationPiggybackVisible,
      successModalShow,
    } = this.state;
    const { navigationConfig } = pageSetup;

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
              getFeaturedObjectsByTelescope={this.getFeaturedObjectsByTelescope}
            />
          )}

          <MissionsList 
            selectedDate={{ reservationDateFormatted }}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
            showMore={this.showMore}
            showShowMoreButton={showShowMoreButton}
            showMoreButtonCaption={showMoreButtonCaption}
            getMissionSlots={() => this.getUpcomingSlotsByTelescope(requestedSlotCount)}
            grabPiggyback={this.grabPiggyback}
          />

          {reservationModalVisible && (
            <ReservationModal
              onHide={this.reservationModalHide}
              onComplete={this.reservationComplete}
              pageSetup={pageSetup}
              navigationConfig={navigationConfig[0]}
              show
            />
          )}

          {reservationPiggybackVisible && (
            <FeaturedObjectsModal
              onHide={this.piggyBackModalHide}
              selectedMission={piggyBackMissionSlot}
              user={user}
              onMissionView={this.reservePiggyback}
              piggyback
              show
            />
          )}

          <MissionSuccessModal
            show={successModalShow}
            onHide={() => this.reservationModalHide(false)}
            reservedMissionData={piggybackReservedMissionData}
            reservedMission={piggybackReservedMission}
            missionSlot={piggyBackMissionSlot}
          />
        </Container>
      </div>
  )};

};
