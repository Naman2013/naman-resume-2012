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
import { MissionQuota } from 'app/modules/missions/components/slooh-1000/mission-quota';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMissionQuota, stopMissionQuotaTimer } from '../../../observatory-list/observatory-actions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMissionQuota,
      stopMissionQuotaTimer,      
    },
    dispatch
  );

const mapStateToProps = (state) => ({
  missionQuota: state.observatoryList.missionQuota
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class QueueTab extends Component {
  state = {
    reservationModalVisible: false,
    reservationPiggybackVisible: false,
    successModalShow: false,
    editCoordinates: false,
    showHoldOneHourButtonWhenExpanded: false,
  };

  componentDidMount(){
    const { setTelescope, currentTelescope, currentObservatory, showFeaturedObjects, fetchMissionQuota } = this.props;
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
    fetchMissionQuota({callSource: 'offlineQueue'})
  }

  componentWillUnmount() {
    stopMissionListTimer();
    this.props.stopMissionQuotaTimer();
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
    const { getTelescopeSlot, setSelectedSlot, offlineQueueTab } = this.props;
    const { scheduledMissionId, uniqueId, showHoldOneHourButtonWhenExpanded } = mission;
    const callSource = offlineQueueTab ? "telescope-offline-queue" : "telescope-online-queue";    
    setSelectedSlot(mission);
    getTelescopeSlot({
      finalizeReservation: finalizeReservation,
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
      callSource,
    }).then(({ payload }) => {
      const { apiError, statusCode } = payload;
      if(!apiError && (statusCode < 400 || statusCode >= 500)){
        this.setState({ reservationModalVisible: true, showHoldOneHourButtonWhenExpanded: showHoldOneHourButtonWhenExpanded });
      }
    });
  };

  getMissionSlot = mission => {
    const { getMissionSlotEdit, currentObservatory, currentTelescope, upcomingSlotsData } = this.props;
    const { scheduledMissionId } = mission;
    const { obsId } = currentObservatory;
    const { reservationDate } = upcomingSlotsData;

    getMissionSlotEdit({
      type: 'editCoords',
      scheduledMissionId,
      obsId,
      domeId: currentTelescope.telePierNumber,
      reservationDate,
    }).then(() => this.setState({ reservationModalVisible: true, editCoordinates: true }));
  };

  grabPiggyback = mission => {
    const { grabPiggyback, offlineQueueTab } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    grabPiggyback({
      callSource: offlineQueueTab ? 'offlineQueue' : 'onlineQueue',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationPiggybackVisible: true }));
  };
  
  reservePiggyback = () => {
    const { reservePiggyback, piggyBackMissionSlot, offlineQueueTab } = this.props;
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
      callSource: offlineQueueTab ? 'offlineQueue' : 'onlineQueue',
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
    const { editCoordinates } = this.state;
    if (cancelMission && !editCoordinates) {
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
      editCoordinates: false,
    });
  };

  reservationComplete = () => {
    const { upcomingSlotsData } = this.props;
    const { requestedSlotCount } = upcomingSlotsData;
    this.getUpcomingSlotsByTelescope(requestedSlotCount);
    this.setState({ reservationModalVisible: false, editCoordinates: false });
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
      timestamp,
      currenttime,
      missionQuota
    } = this.props;
    
    const { missionList, reservationDateFormatted, showShowMoreButton, showMoreButtonCaption, requestedSlotCount } = upcomingSlotsData;
    const { 
      reservationModalVisible,
      reservationPiggybackVisible,
      successModalShow,
      editCoordinates,
      showHoldOneHourButtonWhenExpanded,
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
          {missionQuota && (
            <MissionQuota
              missionQuota={missionQuota}
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
            editCoordinates={this.getMissionSlot}
            timestamp={timestamp}
            currenttime={currenttime}
          />

          {reservationModalVisible && (
            <ReservationModal
              onHide={this.reservationModalHide}
              onComplete={this.reservationComplete}
              pageSetup={pageSetup}
              navigationConfig={navigationConfig[0]}
              editCoordinates={editCoordinates}
              show
              showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
              timestamp={timestamp}
              currenttime={currenttime}
            />
          )}

          {reservationPiggybackVisible && (
            <FeaturedObjectsModal
              onHide={() => this.setState({reservationPiggybackVisible: false})}
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
