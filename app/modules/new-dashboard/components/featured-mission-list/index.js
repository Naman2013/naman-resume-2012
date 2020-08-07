import { Component } from 'react';
import React from "react";
import './style.scss';
import { MissionCard } from '../mission-card';

export class FeaturedMissionList extends Component{

    
    render() {
        // const featuredMissionList = [{objectname: "LMT Cluster Bennett 36 (NGC 2214)" , time: "10:30 UTC", scheduledby: "Regina Murphy", telescope: "Chile One"},
        // {objectname: "LMT Cluster Bennett 36 (NGC 2214)" , time: "10:30 UTC", scheduledby: "Regina Murphy", telescope: "Chile One"}];

        const { featuredMissionList, readOnly, reservationModalShow  } = this.props;
       
        return (
            <div className="featured-main">
                <h2 className="featured-heading">Featured Missions</h2>
                    <div className="featured-row">
                        {featuredMissionList.map( mission => (                            
                            <MissionCard
                                mission={mission}  
                                readOnly={readOnly}   
                                reservationModalShow ={reservationModalShow }            
                            />
                        ))}
                    </div>                                    
            </div>   
        );
    }

}