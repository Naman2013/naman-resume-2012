import React, { Component, PropTypes } from 'react';

import PiggybackOnMission from './reservation-slots/piggyback-on-mission';
import AvailableMission from './reservation-slots/available-mission';
import MissionOnHold from './reservation-slots/mission-on-hold';
import styles from './listings.scss';

class Listings extends Component {

  constructor(props) {
    super(props);

    this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
  }

  componentWillMount() {
    this.setState({
      formOpen: false,
    });
  }

  toggleFormDisplay() {
    const { formOpen } = this.state;
    this.setState({
      formOpen: !formOpen,
    });
  }

  renderReservationSlot(reservation) {
    return(
      <PiggybackOnMission key={reservation.missionIndex} />
    );
    // <PiggybackOnMission />
    // <AvailableMission
    //   toggleFormDisplay={this.toggleFormDisplay}
    //   formOpen={formOpen}
    // />
    // <MissionOnHold />
  }

  render() {

    const { formOpen } = this.state;
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

const { string, number, bool } = PropTypes;
Listings.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.shape({
    missionIndex: number.isRequired,
    scheduledMissionId: number.isRequired,
    uniqueId: string.isRequired,
    missionStart: number.isRequired,
    durationSec: string.isRequired,
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
    ownerId: string.isRequired,
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
