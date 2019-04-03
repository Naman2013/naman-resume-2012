import React, { Component } from 'react';
import { MissionsDaySelector } from '../missions-day-selector';
//import './styles.scss';

export class MissionsList extends Component {
  render() {
    const { selectedDate, selectedTelescopeId, setTelescope } = this.props;
    return (
      <div className="missions-list">
        <MissionsDaySelector selectedDate={selectedDate} />
      </div>
    );
  }
}
