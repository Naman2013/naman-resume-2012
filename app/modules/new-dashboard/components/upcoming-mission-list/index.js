import { Component } from 'react';
import React from "react";
import './style.scss';
import { FeaturedMissionList } from '../featured-mission-list';
import { UpcomingMissionCard } from '../upcoming-mission-card';

export class UpcomingMissionList extends Component{

    
    render() {
        const {heading, scheduleMission, missionList, advancedmissionList, showSubHeading, featuredMission, dashboardFeaturedObjects} = this.props;
        
        return (
            <div className="upcoming-main">
                <h2 className="upcoming-heading">{heading}</h2>  

                {featuredMission && dashboardFeaturedObjects && (
                    <FeaturedMissionList
                        featuredMissionList={dashboardFeaturedObjects.missionList}
                    />
                )}
                
                {showSubHeading && (
                    <div>
                        <br/>
                        <h3 className="upcoming-subheadings">{"Missions"}</h3>
                        <h5 className="upcoming-subheading-status">{"1/5 Missions"}</h5>  
                    </div>                    
                )}                 
                <div className="upcoming-list">
                    {missionList.map(mission=>(
                        <UpcomingMissionCard
                            mission={mission}
                        />
                    ))}
                    {/* {scheduleMission &&(
                        <div className="schedule-mission-card">
                            <div className="upcoming-mission-card-head">
                                <h4 className="schedule-misssion-title">Schedule a New Mission</h4>
                                <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                            </div>        
                            <h4 className="schedule-mission-subtitle">Schedule your next adventure</h4>
                    </div>
                    )}                             */}
                </div>
                {showSubHeading &&(
                    <div>
                        <br/>
                        <h3 className="upcoming-subheadings">{"Advanced Missions"}</h3>
                        <h5 className="upcoming-subheading-status">{"1/1 Missions"}</h5> 
                    </div>                    
                )}                
                <div className="upcoming-list">
                    {advancedmissionList.map(mission=>(
                        <UpcomingMissionCard
                            mission={mission}
                        />
                    ))}
                    {/* {scheduleMission &&(
                        <div className="schedule-mission-card">
                            <div className="upcoming-mission-card-head">
                                <h4 className="schedule-misssion-title">Schedule a New Mission</h4>
                                <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                            </div>        
                            <h4 className="schedule-mission-subtitle">Schedule your next adventure</h4>
                    </div>
                    )}                             */}
                </div>                                      
            </div>   
        );
    }

}