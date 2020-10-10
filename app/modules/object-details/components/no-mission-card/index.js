import { ThreeDotsMenu } from 'app/modules/missions/components/three-dots-menu';
import React, { PureComponent } from 'react';
import { Tooltip } from 'react-tippy';
import './styles.scss';

export class NoMissionCard extends PureComponent {
  render() {
    const {
      title,
      observatoryName,
      time,
      missionStatusText,
    } = this.props;  
   
    return (
      <div
        className={`missions-card`}       
        role="presentation"
      >
        <div className="left">
          <div className="mission-title">{title}</div>    
            <br/>      
            <h4 className="empty-obs-name">{observatoryName}</h4>  
            <h4 className="empty-obs-name">{time}</h4>  
         
        </div>
        <div className="right"> 
          <div className="mission-info">
            {/* <div className="mission-datetime">
              <div className="date">{displayWeekdayMonthDayUTC}</div>

              <div className="time">
                <div className="large">
                  {displayTime}
                  <span className="timezone">{displayTimeZone}</span>
                </div>
              </div>
            </div> */}

            <div
              className="empty-obs-name"
              dangerouslySetInnerHTML={{ __html: missionStatusText }}
            />
          </div>
        </div>

        <div className="mobile">          

          <div className="mission-title">{title}</div>
          <span className="empty-obs-name">{observatoryName}</span>  
          <span className="empty-obs-name">{time}</span> 
          <div
            className="empty-obs-name"
            dangerouslySetInnerHTML={{ __html: missionStatusText }}
          />
        </div>
      </div>
    );
  }
}
