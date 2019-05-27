import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { TelescopeSetup } from '../telescope-setup';
import { MissionsList } from '../missions-list';
import { ReservationModal } from '../telescope-reservation/reservation-modal';
import './styles.scss';

export class Telescope extends Component {
  state = {
    reservationModalVisible: false,
    refreshCountdownLive: false,
    scrolledToSlot: false,
    missionListLodaded: false,
  };

  componentDidMount() {
    this.getMissionSlotDates();
  }

  getMissionSlotDates = (requestedDate = '') => {
    const { getMissionSlotDates, selectedTelescope } = this.props;
    this.setState({ refreshCountdownLive: false });

    getMissionSlotDates(selectedTelescope, requestedDate).then(() =>
      this.setState({ refreshCountdownLive: true })
    );
  };

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
    const { cancelMissionSlot, selectedSlot, selectedDate } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;
    cancelMissionSlot({
      callSource: 'byTelescopeV4',
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    });
    this.getMissionSlotDates(selectedDate.reservationDate);
    this.setState({ reservationModalVisible: false });
  };

  reservationComplete = () => {
    const { selectedDate } = this.props;
    this.getMissionSlotDates(selectedDate.reservationDate);
    this.setState({ reservationModalVisible: false });
  };

  scrollToSlot = () => {
    const { scrollToSMID } = this.props;
    const slotElement = document.getElementById(`mission-slot-${scrollToSMID}`);
    window.scrollTo(
      0,
      window.scrollY + slotElement.getBoundingClientRect().top - 70
    );
    this.setState({ scrolledToSlot: true, missionListLodaded: false });
  };

  render() {
    const {
      selectedTelescope,
      telescopeList,
      setTelescope,
      selectedDate,
      getMissionSlotDates,
      missionList,
      missionListRefreshInterval,
      scrollToSMID,
      pageSetup,
    } = this.props;
    const { setUpTelescopePrompt } = pageSetup;
    const {
      reservationModalVisible,
      refreshCountdownLive,
      scrolledToSlot,
      missionListLodaded,
    } = this.state;
    const isManuallyScrolled = window.scrollY > 0;

    if (missionList.length > 0 && !scrolledToSlot) {
      this.setState({ missionListLodaded: true });
    }
    
    if (
      scrollToSMID &&
      !scrolledToSlot &&
      !isManuallyScrolled &&
      missionListLodaded
    ) {
      this.scrollToSlot();
    }

    return (
      <div className="by-telescope">
        <div className="container">
          <TelescopeSetup
            selectedTelescope={selectedTelescope}
            telescopeList={telescopeList}
            setTelescope={setTelescope}
            setUpTelescopePrompt={setUpTelescopePrompt}
          />

          <MissionsList
            selectedDate={selectedDate}
            selectedTelescope={selectedTelescope}
            getMissionSlotDates={this.getMissionSlotDates}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
            showDateArrows
          />

          {reservationModalVisible && (
            <ReservationModal
              onHide={this.reservationModalHide}
              onComplete={this.reservationComplete}
              pageSetup={pageSetup}
              show
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
        </div>
      </div>
    );
  }
}
