import CircularProgressBar from 'app/modules/new-dashboard/common/circular-progress';
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
                <p className="mission-quota-text">{missionQuota.missionsLimitMsg}</p>
              )}
              {missionQuota.showAdvancedMissions && (
                <p className="mission-quota-text">{missionQuota.advancedMissionsLimitMsg}</p>
              )}
            </div>            
          )}
          {/* <div className="circular-list-div">
            <div className="circular-progress-div">            
              <CircularProgressBar
                strokeWidth="3"
                sqSize="50"
                percentage={(2/5)*100}
                totalValue={5}
                currentValue={2}
              />
              <h6>Regular Mission Quota</h6>
            </div>
            <div className="circular-progress-div">            
              <CircularProgressBar
                strokeWidth="3"
                sqSize="50"
                percentage={(3/5)*100}
                totalValue={5}
                currentValue={3}
              />
              <h6>Advanced Mission Quota</h6>
            </div>
          </div> */}
          
                    
      </div>
    );
  }
}
