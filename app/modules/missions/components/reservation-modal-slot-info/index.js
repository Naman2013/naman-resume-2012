import React, { Component } from 'react';
import moment from 'moment';
import './styles.scss';

export class ReservationModalSlotInfo extends Component {
  render() {
    const { timeSlot, title } = this.props;
    const { missionStart } = timeSlot;

    const missionStartTime = moment(missionStart * 1000);

    return (
      <div className="slot-info">
        <div className="title">
          <div className="label">Time Slot:</div>
          <h4>{title}</h4>
        </div>

        <div className="time">
          {moment(missionStart).format('HH:mm')}
          <span className="timezone">UTC</span>
        </div>
      </div>
    );
  }
}
