import { Component } from 'react';
import React from "react";
import './style.css';
import { ProgressCard } from '../progress-card';


export class UpcomingMissionCard extends Component{

    
    render() {
        const { mission } = this.props;

        return (
            mission.emptyslot ?
                <div className="upcoming-mission-card">
                    <div className="upcoming-mission-card-head">
                        <h4 className="empty-slot-title">{mission.title}</h4>
                        <img className="card-options mar-top-2" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                    </div>  
                    <h4 className="empty-slot-subtitle">{mission.subtitle}</h4>
                </div>
            :
            <div className="upcoming-mission-card">
                <div className="upcoming-mission-card-head">
                    <h4 className="upcoming-obj-name">{mission.objectname}</h4>
                    <img className="card-options mar-top-2" src="https://vega.slooh.com/assets/v4/dashboard-new/three_dots_white.svg"/>
                </div>                
                <h4 className="upcoming-time">{mission.time}</h4>
                <h4 className="upcoming-telescope">{mission.telescope}</h4>                
                {mission.showPicturetaken && (
                    <br/>,
                    <div className="upcoming-mission-card-head  vertical-middle pad-top-10">
                        <h4 className="upcoming-telescope">{mission.picturetakentext}</h4>
                        <img className="card-options mar-left-10" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                    </div>                    
                )}
            </div>
        );
    }

}