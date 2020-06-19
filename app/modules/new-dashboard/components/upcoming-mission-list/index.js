import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from "../tab-header";
import { UpcomingMissionCard } from '../upcoming-mission-card';

export class UpcomingMissionList extends Component{

    
    render() {
        const {heading, scheduleMission, missionList} = this.props;
        
        return (
            <div className="upcoming-main">
                <h2 className="upcoming-heading">{heading}</h2>                        
                    <div className="upcoming-list">
                        {missionList.map(mission=>(
                            <UpcomingMissionCard
                                mission={mission}
                            />
                        ))}
                        {scheduleMission &&(
                            <div className="schedule-mission-card">
                                <div className="upcoming-mission-card-head">
                                    <h4 className="schedule-misssion-title">Schedule a New Mission</h4>
                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow.svg"/>
                                </div>        
                                <h4 className="schedule-mission-subtitle">Schedule your next adventure</h4>
                        </div>
                        )}                            
                    </div>
                                                               
            </div>   
        );
    }

}