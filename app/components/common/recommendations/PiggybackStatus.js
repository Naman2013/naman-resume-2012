import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import APP_DEFAULTS from '../../../constants/defaults';
import MissionStart from './MissionStart';
import s from './Recommendation.scss';

class PiggybackStatus extends Component {
  static propTypes = {
    telescopePierName: PropTypes.string,
    newMissionMode: PropTypes.bool.isRequired,
    piggybackAvailable: PropTypes.bool.isRequired,
    newMissionAvailable: PropTypes.bool.isRequired,
    userHasReservation: PropTypes.bool.isRequired,
    piggybackMissionStart: PropTypes.number.isRequired,
    newMissionMissionStart: PropTypes.number.isRequired,
    handleReservePiggybackClick: PropTypes.func.isRequired,
    handleLoadReservationClick: PropTypes.func.isRequired,
    handleReserveNewMissionClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    telescopePierName: '',
    getNextReservationResponse: {
      missionList: [{
        missionAvailable: true,
      }],
    },
  }

  renderContent() {
    const {
      userHasReservation,
      piggybackAvailable,
      newMissionAvailable,
      newMissionMode,
      piggybackMissionStart,
      newMissionMissionStart,
      telescopePierName,
    } = this.props;

    if (userHasReservation) {
      return (
        <div>
          <h5 className={s.missionStatusTitle}>You have an upcoming mission reservation scheduled for</h5>
          <date className={s.missionDateInfo}>
            <MissionStart missionStart={piggybackMissionStart} />
            <p>{telescopePierName}</p>
          </date>
        </div>
      );
    }

    if (piggybackAvailable) {
      return (
        <div>
          <h5 className={s.missionStatusTitle}>Join an <i>existing</i> mission:</h5>
          <date className={s.missionDateInfo}>
            <MissionStart missionStart={piggybackMissionStart} />
          </date>
        </div>
      );
    }

    if (newMissionAvailable && newMissionMode) {
      return (
        <div>
          <h5 className={s.missionStatusTitle}>Set up a new mission:</h5>
          <date className={s.missionDateInfo}>
            <MissionStart missionStart={newMissionMissionStart} />
          </date>
        </div>
      );
    }

    if (!piggybackAvailable && !newMissionMode) {
      return (
        <div>
          <h5 className={s.missionStatusTitle}>No existing missions are available</h5>
        </div>
      );
    }

    if (!newMissionAvailable && newMissionMode) {
      return (
        <div>
          <h5 className={s.missionStatusTitle}>No missions are available</h5>
        </div>
      );
    }

    return null;
  }

  renderCallToAction() {
    const {
      userHasReservation,
      piggybackAvailable,
      newMissionMode,
      newMissionAvailable,
      handleReservePiggybackClick,
      handleLoadReservationClick,
      handleReserveNewMissionClick,
    } = this.props;

    if (userHasReservation) {
      return (
        <Link to="/settings/dashboard" className="btn-primary">
          View Reservations
        </Link>
      );
    }

    if (piggybackAvailable) {
      return (
        <div>
          <button
            data-tip={APP_DEFAULTS.PIGGYBACK_SHORT_DESCRIPTION}
            onClick={handleReservePiggybackClick} className="btn-primary"
          >
            Piggyback on Mission
          </button>
        </div>
      );
    }

    if (!piggybackAvailable && !newMissionMode) {
      return (
        <button onClick={handleLoadReservationClick} className="btn-primary">Check Schedule</button>
      );
    }

    if (newMissionAvailable && newMissionMode) {
      return (
        <button onClick={handleReserveNewMissionClick} className="btn-primary">Make Reservation</button>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <div>
          {
            this.renderContent()
          }
        </div>

        <div className={s.callToAction}>
          {
            this.renderCallToAction()
          }
        </div>
      </div>
    );
  }
}

export default PiggybackStatus;
