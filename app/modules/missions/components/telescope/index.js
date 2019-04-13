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
    const { cancelMissionSlot } = this.props;
    this.setState({ reservationModalVisible: false });
  };

  render() {
    const {
      selectedTelescope,
      telescopeList,
      setTelescope,
      selectedDate,
      setTelescopeDate,
      getMissionSlotDates,
      missionList,
      selectedSlot,
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

          <ReservationModal
            onHide={this.reservationModalHide}
            show={reservationModalVisible}
            selectedSlot={selectedSlot}
            selectedTelescope={selectedTelescope}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    );
  }
}
