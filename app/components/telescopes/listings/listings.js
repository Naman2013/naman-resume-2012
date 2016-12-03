import React, { Component } from 'react';

import PiggybackOnMission from './reservation-slots/piggyback-on-mission';
import AvailableMission from './reservation-slots/available-mission';
import MissionOnHold from './reservation-slots/mission-on-hold';
import styles from './listings.scss';

export default class Listings extends Component {

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

  render() {

    const { formOpen } = this.state;

    return (
      <div className="telescope-listings">
        <ul className="list">
          <PiggybackOnMission />
          <AvailableMission
            toggleFormDisplay={this.toggleFormDisplay}
            formOpen={formOpen}
          />
          <MissionOnHold />
        </ul>
      </div>
    );
  }
}
