import React, { Component } from 'react';

import PiggybackOnMission from './reservation-slots/piggyback-on-mission';
import styles from './listings.scss';

export default class Listings extends Component {
  constructor(props) {
    super(props);
  }

  getListItem(itemData, index) {
    // TODO: based on the data, return one type of reservation-slot
    // from ./reservation-slots
  }

  render() {
    return (
      <div className="telescope-listings">
        <ul className="list">
          <PiggybackOnMission />
        </ul>
      </div>
    );
  }
}
