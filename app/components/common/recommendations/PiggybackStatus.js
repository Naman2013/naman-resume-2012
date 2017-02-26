import React, { Component, PropTypes } from 'react';
import MissionStart from './MissionStart';
import s from './Recommendation.scss';

class PiggybackStatus extends Component {
  static propTypes = {
    newMissionMode: PropTypes.bool.isRequired,
    piggybackAvailable: PropTypes.bool.isRequired,
    newMissionAvailable: PropTypes.bool.isRequired,
    piggybackMissionStart: PropTypes.number.isRequired,
    newMissionMissionStart: PropTypes.number.isRequired,
    handleReservePiggybackClick: PropTypes.func.isRequired,
    handleLoadReservationClick: PropTypes.func.isRequired,
    handleReserveNewMissionClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    getNextReservationResponse: {
      missionList: [{
        missionAvailable: true,
      }],
    },
  }

  render() {
    const {
      newMissionMode,
      piggybackAvailable,
      piggybackMissionStart,
      newMissionMissionStart,
      handleReservePiggybackClick,
      handleLoadReservationClick,
      handleReserveNewMissionClick,
      newMissionAvailable,
    } = this.props;

    return (
      <div>
        <div>
          {
            piggybackAvailable ?
              <div>
                <h5 className={s.missionStatusTitle}>Join an <i>existing</i> mission:</h5>
                <date className={s.missionDateInfo}>
                  <MissionStart missionStart={piggybackMissionStart} />
                </date>
              </div> : null
          }

          {
            (newMissionAvailable && newMissionMode) ?
              <div>
                <h5 className={s.missionStatusTitle}>Set up a new mission:</h5>
                <date className={s.missionDateInfo}>
                  <MissionStart missionStart={newMissionMissionStart} />
                </date>
              </div> : null
          }

          {
            (!piggybackAvailable && !newMissionMode) ?
              <div>
                <h5 className={s.missionStatusTitle}>No existing missions are available</h5>
              </div> : null
          }

          {
            (!newMissionAvailable && newMissionMode) ?
              <div>
                <h5 className={s.missionStatusTitle}>No missions are available</h5>
              </div> : null
          }

        </div>

        <div className={s.callToAction}>
          {
            piggybackAvailable ?
              <button onClick={handleReservePiggybackClick} className="btn-primary">
                Piggyback on Mission
              </button> : null
          }

          {
            (!piggybackAvailable && !newMissionMode) ?
              <button onClick={handleLoadReservationClick} className="btn-primary">Make Reservation</button> : null
          }

          {
            (newMissionAvailable && newMissionMode) ?
              <button onClick={handleReserveNewMissionClick} className="btn-primary">Make Reservation</button> : null
          }
        </div>
      </div>
    );
  }
}

export default PiggybackStatus;
