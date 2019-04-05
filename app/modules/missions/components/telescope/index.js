import React, { Component } from 'react';
import { TelescopeSetup } from '../telescope-setup';
import { MissionsList } from '../missions-list';
import './styles.scss';

export class Telescope extends Component {
  render() {
    const {
      selectedTelescope,
      telescopeList,
      setTelescope,
      selectedDate,
      setTelescopeDate,
      getMissionSlotDates,
      missionList,
    } = this.props;

    return (
      <div className="by-telescope">
        <div className="container">
          <TelescopeSetup
            selectedTelescope={selectedTelescope}
            telescopeList={telescopeList}
            setTelescope={setTelescope}
          />

          <MissionsList
            selectedDate={selectedDate}
            selectedTelescope={selectedTelescope}
            getMissionSlotDates={getMissionSlotDates}
            missionList={missionList}
          />
        </div>
      </div>
    );
  }
}
