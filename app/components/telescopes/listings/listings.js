import React, { Component, PropTypes } from 'react';

import MissionReserved from './reservation-slots/mission-reserved';
import AvailableMission from './reservation-slots/available-mission';
import MissionOnHold from './reservation-slots/mission-on-hold';
import MissionNotAvailable from './reservation-slots/mission-not-available';
import NoMissionsAvailable from './reservation-slots/no-missions-available';

import styles from './listings.scss';

// possible reservation slot status's
const RESERVED = 'reserved';
const AVAILABLE = 'available';
const ON_HOLD = 'onhold';
const NOT_AVAILABLE = 'notavailable';



class Listings extends Component {
  renderReservationSlot(reservation) {
    const { allowReservations, telescopeId } = this.props;
    const { slotStatus } = reservation;

    if(!allowReservations && slotStatus === NOT_AVAILABLE) {
      return(
        <NoMissionsAvailable
          key={reservation.missionIndex}
          {...reservation}
        />
      );
    }

    if(slotStatus === RESERVED) {
      return(
        <MissionReserved
          key={reservation.missionIndex}
          {...reservation}
        />
      );
    }

    if(slotStatus === AVAILABLE) {
      return(
        <AvailableMission
          key={reservation.missionIndex}
          telescopeId={telescopeId}
          {...reservation}
        />
      );
    }

    if(slotStatus === ON_HOLD) {
      return(
        <MissionOnHold
          key={reservation.missionIndex}
          {...reservation}
        />
      );
    }

    if(slotStatus === NOT_AVAILABLE) {
      return(
        <MissionNotAvailable
          key={reservation.missionIndex}
          {...reservation}
        />
      );
    }
  }

  render() {
    const { reservations } = this.props;

    return (
      <div className="telescope-listings">
        <ul className="list">
          {
            reservations.map(reservation => this.renderReservationSlot(reservation))
          }
        </ul>
      </div>
    );
  }
}

const { string, number, bool, arrayOf } = PropTypes;
Listings.propTypes = {
  allowReservations: bool.isRequired,
  telescopeId: string.isRequired,
  reservations: arrayOf(PropTypes.shape({
    missionIndex: number.isRequired,
    scheduledMissionId: number.isRequired,
    uniqueId: string.isRequired,
    missionStart: number.isRequired,
    durationSec: number.isRequired,
    expires: number.isRequired,
    slotStatus: string.isRequired,
    missionType: string.isRequired,
    showSlotTimes: bool.isRequired,
    showBrowseButton: bool.isRequired,
    showCatalogButton: bool.isRequired,
    showCoordinateButton: bool.isRequired,
    showHoldOneHourButtonWhenExpanded: bool.isRequired,
    showCancelHoldButtonWhenExpanded: bool.isRequired,
    showCancelXWhenExpanded: bool.isRequired,
    showEditCoordinatesButton: bool.isRequired,
    showFinishReservationButton: bool.isRequired,
    showPiggybackButton: bool.isRequired,
    showShareMissionIcons: bool.isRequired,
    shareMissionIconsText: string.isRequired,
    canEditMission: bool.isRequired,
    canDeleteMission: bool.isRequired,
    canDeletePiggyback: bool.isRequired,
    showNoReservations: bool.isRequired,
    noReservationsIconURL: string.isRequired,
    noReservationsExplanation: string.isRequired,
    slotTitle: string.isRequired,
    slotIconURL: string.isRequired,
    userHasReservation: bool.isRequired,
    userReservationType: string.isRequired,
    userHasHold: bool.isRequired,
    userHoldType: string.isRequired,
    showSloohUser: bool.isRequired,
    showUserDetails: bool.isRequired,
    ownerId: number.isRequired,
    ownerLocation: string.isRequired,
    ownerFirstName: string.isRequired,
    ownerDisplayName: string.isRequired,
    ownerMembershipType: string.isRequired,
    ownerGuardianFlag: bool.isRequired,
    ownerMemberSince: string.isRequired,
    ownerAvatarType: string.isRequired,
    ownerAvatarURL: string.isRequired,
  })),
};

export default Listings;
