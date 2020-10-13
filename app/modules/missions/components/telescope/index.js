import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { TelescopeSetup } from '../telescope-setup';
import { MissionsList } from '../missions-list';
import { ReservationModal } from '../telescope-reservation/reservation-modal';
import { FeaturedObjectsModal } from '../../../telescope/components/featured-objects-modal';
import { MissionSuccessModal } from '../mission-success-modal';
import UpgradeModal from '../../../../modules/account-settings/containers/upgrade-modal';
import { browserHistory } from 'react-router';
import './styles.scss';
import { fetchMissionQuotaData } from 'app/services/events/fetch-upcoming-events';
import { getUserInfo } from 'app/modules/User';

export class Telescope extends Component {
  state = {
    reservationModalVisible: false,
    refreshCountdownLive: false,
    reservationPiggybackVisible: false,
    successModalShow: false,
    editCoordinates: false,
    callSource: "",
    upsellCallSource: "",
    showHoldOneHourButtonWhenExpanded: false,
    missionQuota: undefined,
  };  

  componentDidMount() {
    this.getMissionSlotDates();
    this.fetchMissionQuotaAction();
  }

  componentDidUpdate() {
    const { scrolledToSlot, missionListLodaded, scrollToSMID } = this.props;
    if (scrollToSMID && !scrolledToSlot && missionListLodaded) {
      this.scrollToSlot();
    } 
  }

  componentWillUnmount() {   
    this.stopMissionQuotaTimer();  
  }

  fetchMissionQuotaAction = () =>{
    const { at, cid, token} = getUserInfo();    
    const callSource='byTelescopeV4';
    fetchMissionQuotaData({ at, cid, token, callSource}).then(response=>{
      const res = response.data;
      if(!res.apiError){
        this.stopMissionQuotaTimer();
        const duration = (res.expires - res.timestamp) * 1000;
        if(duration > 1000)
          this.startMissionQuotaTimer(duration);
        this.setState({missionQuota: res});
      }
    })
  }

  startMissionQuotaTimer = (duration) => {
    this.timerId=setTimeout(()=>this.fetchMissionQuotaAction(), duration);        
  }
  
  stopMissionQuotaTimer = () => {
    if(this.timerId !== null)
      clearTimeout(this.timerId);
  }



  getMissionSlotDates = (requestedDate = '') => {    
    const { getMissionSlotDates, selectedTelescope } = this.props;
    this.setState({ refreshCountdownLive: false });
    
    getMissionSlotDates(selectedTelescope, requestedDate).then(() =>
      this.setState({ refreshCountdownLive: true })
    );
  };

  grabPiggyback = mission => {
    const { grabPiggyback, pageSetup } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    if(!pageSetup.navigationConfig[3].locked)
    grabPiggyback({
      callSource: 'byTelescopeV4',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationPiggybackVisible: true}));
  };

  getTelescopeSlot = (mission, finalizeReservation = false) => {
    const { getTelescopeSlot, setSelectedSlot } = this.props;
    const callSource="missionhub-bytelescope";
    const { scheduledMissionId, uniqueId, showHoldOneHourButtonWhenExpanded  } = mission;
    setSelectedSlot(mission);
    getTelescopeSlot({
      finalizeReservation,
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
      callSource,    
    }).then(() => {
      this.stopMissionQuotaTimer(); 
      this.setState({ reservationModalVisible: true, showHoldOneHourButtonWhenExpanded: showHoldOneHourButtonWhenExpanded  });
    });
  };

  reservationModalHide = (cancelMission = true) => {
    const { cancelMissionSlot, selectedSlot, selectedDate } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;
    const { editCoordinates } = this.state;
    if (cancelMission && !editCoordinates) {
      cancelMissionSlot({
        callSource: 'byTelescopeV4',
        grabType: 'notarget',
        scheduledMissionId,
        uniqueId,
      });
    }
    this.getMissionSlotDates(selectedDate.reservationDate);
    this.fetchMissionQuotaAction();
    this.setState({
      reservationModalVisible: false,
      reservationPiggybackVisible: false,
      successModalShow: false,
      editCoordinates: false,
    }); 
  };

  reservationComplete = () => {
    const { selectedDate } = this.props;
    this.getMissionSlotDates(selectedDate.reservationDate);
    this.fetchMissionQuotaAction();
    this.setState({ reservationModalVisible: false, editCoordinates: false });
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

  getMissionSlot = mission => {
    const { getMissionSlotEdit, selectedTelescope, selectedDate } = this.props;
    const { scheduledMissionId } = mission;
    const { obsId, domeId } = selectedTelescope;
    const { reservationDate } = selectedDate;

    getMissionSlotEdit({
      type: 'editCoords',
      scheduledMissionId,
      obsId,
      domeId,
      reservationDate,
    }).then(() =>{
      this.stopMissionQuotaTimer();
      this.setState({ reservationModalVisible: true, editCoordinates: true })
    });
  };

  scrollToSlot = () => {
    const { scrollToSMID, missionList, setScrolledToSlot } = this.props;
    const slotElement = document.getElementById(`mission-slot-${scrollToSMID}`);
    const scrollLength =
      missionList[0].scheduledMissionId === scrollToSMID ? 300 : 70;
    if (slotElement) {
      window.scrollTo(
        0,
        window.scrollY + slotElement.getBoundingClientRect().top - scrollLength
      );
      setScrolledToSlot();
    }
  };

  render() {
    const {
      selectedTelescope,
      telescopeList,
      setTelescope,
      selectedDate,
      missionList,
      missionListRefreshInterval,
      timestamp,
      currenttime,
      pageSetup,
      piggyBackMissionSlot,
      user,
      piggybackReservedMissionData,
      piggybackReservedMission,
    } = this.props;
    const { setUpTelescopePrompt, navigationConfig } = pageSetup;
    const { locked } = navigationConfig[3];
    const {
      reservationModalVisible,
      refreshCountdownLive,
      reservationPiggybackVisible,
      successModalShow,
      editCoordinates,
      showHoldOneHourButtonWhenExpanded,
      missionQuota
    } = this.state;
    
    return (
      <div className="by-telescope">        
        <div className="container">
          <TelescopeSetup
            selectedTelescope={selectedTelescope}
            telescopeList={telescopeList}
            setTelescope={setTelescope}
            setUpTelescopePrompt={setUpTelescopePrompt}
            missionQuota={missionQuota}
          />

          <MissionsList
            selectedDate={selectedDate}
            selectedTelescope={selectedTelescope}
            getMissionSlotDates={this.getMissionSlotDates}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
            getMissionSlots={this.getMissionSlotDates}
            grabPiggyback={this.grabPiggyback}
            editCoordinates={this.getMissionSlot}
            showDateArrows
            locked={locked}
            timestamp={timestamp}
            currenttime={currenttime}
          />

          {reservationModalVisible && (
            <ReservationModal
              onHide={this.reservationModalHide}
              onComplete={this.reservationComplete}
              pageSetup={pageSetup}
              navigationConfig={navigationConfig[3]}
              editCoordinates={editCoordinates}
              show
              showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
              timestamp={timestamp}
              currenttime={currenttime}
            />
          )}

          {!reservationModalVisible && refreshCountdownLive && (
            <div className="mission-refresh-countdown">
              <Countdown
                date={Date.now() + missionListRefreshInterval * 1000}
                onComplete={() =>
                  this.getMissionSlotDates(selectedDate.reservationDate)
                }
              />
            </div>
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
        </div>       
      </div>
    );
  }
}
