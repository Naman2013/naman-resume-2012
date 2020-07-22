import { Component } from 'react';
import React from "react";
import './style.scss';
import { ThreeDotsMenu } from '../../common/three-dot-menu';


export class UpcomingMissionCard extends Component{

    
    render() {
        const { mission, 
                cancelReservation, 
                cancelPiggyback, 
                // grabPiggyback, 
            } = this.props;
        
        return (
            mission.emptyslot ?
                <div className="upcoming-mission-card">
                    <div className="upcoming-mission-card-head">
                        <h4 className="empty-slot-title">{mission.missionTitle}</h4>
                        <img className="card-options mar-top-2" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                    </div>  
                    <h4 className="empty-slot-subtitle">{mission.subtitle}</h4>
                </div>
            :
            <div className="upcoming-mission-card">
                <div className="upcoming-mission-card-head">
                    <h4 className="upcoming-obj-name">{mission.missionTitle}</h4>
                    {mission.showDotMenu && (
                        <ThreeDotsMenu
                            timeSlot={mission}
                            cancelReservation={() => cancelReservation(mission)}
                            cancelPiggyback={() => cancelPiggyback(mission)}
                            // grabPiggyback={grabPiggyback}
                        />
                    )}
                    {/* <img className="card-options mar-top-2" src="https://vega.slooh.com/assets/v4/dashboard-new/three_dots_white.svg"/> */}
                </div>                
                <h4 className="upcoming-time">{mission.missionStartFormatted.displayDateTime}</h4>
                <h4 className="upcoming-telescope">{mission.telescopePierName}</h4>                
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