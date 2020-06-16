import { Component } from 'react';
import React from "react";
import './style.css';
import { ProgressCard } from '../progress-card';


export class UpcomingMissionCard extends Component{

    
    render() {
        const { mission } = this.props;

        return (
            <div className="upcoming-mission-card">
                <div>
                    <h4 className="upcoming-obj-name">{mission.objectname}</h4>
                </div>                
                <h4 className="upcoming-time">{mission.time}</h4>
                <h4 className="upcoming-telescope">{mission.telescope}</h4>                
                {mission.showPicturetaken && (
                    <br/>,
                    <h4 className="upcoming-telescope pad-top-10">{mission.picturetakentext}</h4>
                )}
            </div>
        );
    }

}