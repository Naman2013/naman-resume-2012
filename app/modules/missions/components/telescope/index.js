import React, { Component } from 'react';
import { TelescopeSetup } from '../telescope-setup';
import { MissionsList } from '../missions-list';
import { ReservationModal } from '../telescope-reservation/reservation-modal';
import './styles.scss';

export class Telescope extends Component {
  state = {
    reservationModalVisible: false,
  };

  componentDidMount() {
    this.getMissionSlotDates();
  }

  getMissionSlotDates = () => {
    const { getMissionSlotDates, selectedTelescope } = this.props;
    getMissionSlotDates(selectedTelescope);
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
    const { cancelMissionSlot, selectedSlot } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;
    cancelMissionSlot({
      callSource: 'byTelescopeV4',
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    });
    this.setState({ reservationModalVisible: false });
  };

  reservationComplete = () => {
    this.getMissionSlotDates();
    this.setState({ reservationModalVisible: false });
  }

  render() {
    const {
      selectedTelescope,
      telescopeList,
      setTelescope,
      selectedDate,
      getMissionSlotDates,
      missionList,
    } = this.props;

    const { reservationModalVisible } = this.state;

    return (
      <div className="by-telescope">
        <div className="container">
          <TelescopeSetup
            selectedTelescope={selectedTelescope}
            telescopeList={telescopeList}
            setTelescope={setTelescope}
          />

          <MissionsList
            selectedDate={selectedDate}
            selectedTelescope={selectedTelescope}
            getMissionSlotDates={getMissionSlotDates}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
          />

          {reservationModalVisible && (
            <ReservationModal onHide={this.reservationModalHide} onComplete={this.reservationComplete} show />
          )}
        </div>
      </div>
    );
  }
}
