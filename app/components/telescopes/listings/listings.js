import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import PiggybackOnMission from './reservation-slots/piggyback-on-mission';
import AvailableMission from './reservation-slots/available-mission';
import MissionOnHold from './reservation-slots/mission-on-hold';
import MissionConfirmModal from '../../missions/mission-confirm-modal';
import { getNextPiggybackSingle } from '../../../modules/Missions';
import { resetMissionAvailability } from '../../../modules/Piggyback';
import styles from './listings.scss';

// possible reservation slot status's
const RESERVED = 'reserved';
const AVAILABLE = 'available';
const ON_HOLD = 'onhold';
const NOT_AVAILABLE = 'notavailable';

const mapStateToProps = ({ piggyback }) => ({
  piggyback,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getNextPiggybackSingle,
    resetMissionAvailability,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
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
    const { formOpen } = this.state;
    const { slotStatus } = reservation;

    if(slotStatus === RESERVED) {
      return(
        <PiggybackOnMission
          key={reservation.missionIndex}
          {...reservation}
        />
      );
    }

    if(slotStatus === AVAILABLE) {
      return(
        <AvailableMission
          key={reservation.missionIndex}
          toggleFormDisplay={this.toggleFormDisplay}
          formOpen={formOpen}
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
      console.group('TODO: painting reservation list');
      console.log('create not available slot type component');
      console.groupEnd();
      return null;
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

        <MissionConfirmModal />
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
