import React, { Component } from 'react';
import chevron from 'atoms/icons/chevron.svg';
import './styles.scss';

export class MissionsDaySelector extends Component {
  render() {
    const { telescopeList, selectedTelescopeId, setTelescope } = this.props;
    return (
      <div className="missions-day-selector">
        <div className="date">
          <span>The night of</span> date
        </div>
        <div className="arrows prev">
          <div>
            <img alt="prev" src={chevron} />
          </div>
        </div>
        <div className="arrows next">
          <div>
            <img alt="next" src={chevron} />
          </div>
        </div>
      </div>
    );
  }
}
