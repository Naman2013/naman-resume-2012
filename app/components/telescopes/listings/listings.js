import React, { Component } from 'react';

import PiggybackOnMission from './reservation-slots/piggyback-on-mission';
import AvailableMission from './reservation-slots/available-mission';
import MissionOnHold from './reservation-slots/mission-on-hold';
import styles from './listings.scss';

export default class Listings extends Component {
  render() {
    return (
      <div className="telescope-listings">
        <ul className="list">
          <PiggybackOnMission />
          <AvailableMission />
          <MissionOnHold />
        </ul>
      </div>
    );
  }
}
