import React, { Component } from 'react';
import moment from 'moment';
import { MissionsDaySelector } from '../missions-day-selector';
import { MissionTimeSlot } from '../mission-time-slot';

export class MissionsList extends Component {
  selectDate = date => {
    const { selectedTelescope, getMissionSlotDates } = this.props;
    getMissionSlotDates(selectedTelescope, date);
  };

  render() {
    const { selectedDate, missionList, getTelescopeSlot } = this.props;

    return (
      <div className="missions-list">
        <MissionsDaySelector
          selectedDate={selectedDate}
          selectDate={this.selectDate}
        />

        {missionList &&
          missionList.length > 0 &&
          missionList.map(item => (
            <MissionTimeSlot
              key={item.scheduledMissionId}
              timeSlot={item}
              getTelescopeSlot={() => getTelescopeSlot(item)}
            />
          ))}
      </div>
    );
  }
}
