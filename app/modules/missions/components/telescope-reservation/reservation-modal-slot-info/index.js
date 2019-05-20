import React, { PureComponent } from 'react';
import moment from 'moment';
import './styles.scss';

export class ReservationModalSlotInfo extends PureComponent {
  render() {
    const { timeSlot, title } = this.props;
    const { missionStart } = timeSlot;

    const missionStartTime = moment.utc(missionStart * 1000);

    return (
      <div className="slot-info">
        <div className="title">
          <div className="label">Time Slot:</div>
          <h4>{title}</h4>
        </div>

        <div className="time">
          <div className="large">
            {missionStartTime.format('HH:mm')}
            <span className="timezone">UTC</span>
          </div>
          <div className="other">
            {missionStartTime.tz('America/New_York').format('LT')} EDT /{' '}
            {missionStartTime.tz('America/Los_Angeles').format('LT')} PDT
          </div>
        </div>
      </div>
    );
  }
}
