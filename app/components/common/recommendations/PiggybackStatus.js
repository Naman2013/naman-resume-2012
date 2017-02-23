import React, { PropTypes } from 'react';
import MissionStart from './MissionStart';
import s from './Recommendation.scss';

const PiggybackStatus = ({ missionAvailable, missionStart }) => (
  <div>
    <div>
      {
        missionAvailable ?
          <div>
            <h5 className={s.missionStatusTitle}>Join and <i>existing</i> mission:</h5>
            <date className={s.missionDateInfo}>
              <MissionStart missionStart={missionStart} />
            </date>
          </div>
          :
          <div>
            <h5 className={s.missionStatusTitle}>No existing missions are available</h5>
          </div>
      }
    </div>

    <div className={s.callToAction}>
      {
        missionAvailable ?
          <button className="btn-primary">Piggyback on Mission</button>
          :
          <button className="btn-primary">Make Reservation</button>
      }
    </div>
  </div>
);

PiggybackStatus.propTypes = {
  missionAvailable: PropTypes.bool.isRequired,
  missionStart: PropTypes.number.isRequired,
};

export default PiggybackStatus;
