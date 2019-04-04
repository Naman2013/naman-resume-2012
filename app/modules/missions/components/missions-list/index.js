import React, { Component } from 'react';
import moment from 'moment';
import { MissionsDaySelector } from '../missions-day-selector';
import { MissionTimeSlot } from '../mission-time-slot';
//import './styles.scss';

const DAY_TIMESTAMP = 24 * 60 * 60 * 1000;

export class MissionsList extends Component {
  selectDate = date => {
    const { selectedTelescope, getMissionSlotDates } = this.props;
    getMissionSlotDates(selectedTelescope, date);
  };

  render() {
    const { selectedDate, missionList } = this.props;
    console.log(missionList);
    return (
      <div className="missions-list">
        <MissionsDaySelector
          selectedDate={selectedDate}
          selectDate={this.selectDate}
        />

        {missionList &&
          missionList.length > 0 &&
          missionList.map(item => (
            <MissionTimeSlot key={item.scheduledMissionId} timeSlot={item} />
          ))}
      </div>
    );
  }
}
