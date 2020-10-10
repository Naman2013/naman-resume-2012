import React, { Component } from 'react';
import './styles.scss';

export class MissionQuota extends Component {

  render() {
    const {     
      missionQuota,
    } = this.props;
    
    return (
      <div className="">        
          {missionQuota && (
            <div>
              {missionQuota.showMissions && (
                <p>{missionQuota.missionsLimitMsg}</p>
              )}
              {missionQuota.showAdvancedMissions && (
                <p>{missionQuota.advancedMissionsLimitMsg}</p>
              )}
            </div>            
          )}          
      </div>
    );
  }
}
