import { Component } from 'react';
import React from "react";
import './style.scss';
import { ProgressCard } from '../progress-card';
import { Link } from 'react-router';
import { Tooltip } from 'react-tippy';
import { Button } from '../button';

export class MissionCard extends Component{

    
    render() {
        const { mission, readOnly, reservationModalShow  } = this.props;
        
        return (
            <div className="mission-card">                
                <h4 className="obj-name" >{mission.title}</h4>
                <h4 className="time">{mission.missionStartFormatted.displayDateTime}</h4>
                {/* <h4 className="scheduled-by"> 
                     by <u>{mission.ownerDisplayName}</u> 
                     &nbsp;at <u>{mission.telescopeName}</u>
                </h4> */}
                <h4 className="upcoming-telescope">                      
                    {mission.telescopeName}
                </h4>
                {/* {mission.missionAvailable && !mission.userHasReservation && !readOnly && (
                    <Link onClick={()=>reservationModalShow(mission)}>
                        <div className="upcoming-mission-card-head  vertical-middle pad-top-10">
                            <div className="upcoming-mission-card-head">
                                <h4 className="upcoming-telescope">{"Join as a spectator >"}</h4>
                                <img className="card-options mar-left-10" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                            </div>                          
                            {mission.showJoiningMission ? ( 
                            <Tooltip
                            className="mission-tooltip"
                            title={mission.joiningMissionTooltipText}
                            position="top"
                            theme="light">
                                <img alt="" className="scheduled-mission-icon" src={mission.joiningMissionIconURL} />
                            </Tooltip>) : null}       
                        </div> 
                    </Link>
                )} */}
                <div className="vertical-middle pad-top-10">
                    {mission.missionAvailable && !mission.userHasReservation && !readOnly && mission.showJoinButton &&(
                        // <Link onClick={()=>reservationModalShow(mission)}>
                            <Button
                                type={"button"}
                                onClickEvent={()=>reservationModalShow(mission)} 
                                text={mission.joinButtonCaption}                                             
                                style={"join-mission"}
                                icon={null}
                            />
                        // </Link>
                    )}
                    {mission.showJoiningMission ? ( 
                        <Tooltip
                            className="mission-tooltip-icon"
                            title={mission.joiningMissionTooltipText}
                            position="top"
                            theme="light">
                                <img alt="" className="scheduled-mission-icon" src={mission.joiningMissionIconURL} />
                        </Tooltip>
                    ) : null}   
                </div>
                                
            </div>
        );
    }

}