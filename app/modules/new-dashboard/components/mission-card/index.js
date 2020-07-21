import { Component } from 'react';
import React from "react";
import './style.scss';
import { ProgressCard } from '../progress-card';


export class MissionCard extends Component{

    
    render() {
        const { mission, readOnly, reservationModalShow  } = this.props;
        
        return (
            <div className="mission-card">                
                <h4 className="obj-name" onClick={mission.missionAvailable && !mission.userHasReservation && !readOnly ? () => reservationModalShow(mission): null}>{mission.title}</h4>
                <h4 className="time">{mission.missionStartFormatted.displayWeekdayMonthDayYearUTC + " " + mission.missionStartFormatted.displayTimeZone}</h4>
                <h4 className="scheduled-by"> 
                     by <u>{mission.ownerDisplayName}</u> 
                     &nbsp;at <u>{mission.telescopeName}</u>
                </h4>
            </div>
        );
    }

}