import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeaderWithStatus } from '../tab-header-with-status';
import { MissionCard } from '../mission-card';


export class Observatories extends Component{

    
    render() {
        const heading = "Observatories";        
        const featuredMissionList = [{objectname: "LMT Cluster Bennett 36 (NGC 2214)" , time: "10:30 UTC", scheduledby: "Regina Murphy", telescope: "Chile One"},
                                    {objectname: "LMT Cluster Bennett 36 (NGC 2214)" , time: "10:30 UTC", scheduledby: "Regina Murphy", telescope: "Chile One"}];
        return (
            <div className="observatory-main">                
                <h2 className="observatory-heading">{heading}</h2>
                <TabHeaderWithStatus
                        headings={[{heading: "Chile", status: false, statusText: "Offline(Non-Active Hours)"},
                                   {heading: "Canary Islands", status: true, statusText: "Online"}]}
                        activeHeading={"Chile"}
                        spaceequally={false}
                />
                <div className="observatory-content">
                    <div className="observatory-row">
                        <div className="observatory-col-left">
                            <h5 className="observatory-col-txt">Current Time in Chile</h5>
                            <h5 className="observatory-col-value">12:36 UTC</h5>
                            <br/>
                            <h5 className="observatory-col-txt">Night Telescope Hours</h5>
                            <h5 className="observatory-col-value">23:30 - 06:00 UTC</h5>
                            <br/>
                        </div>
                        <div className="observatory-col-right">
                        <h5 className="observatory-col-txt">Sunrise - Sunset</h5>
                            <h5 className="observatory-col-value">11:07 - 22:18 UTC</h5>
                            <br/>
                            <h5 className="observatory-col-txt">Moonrise - Moonset</h5>
                            <h5 className="observatory-col-value">03:10 - 17:00 UTC</h5>
                            <br/>
                            <h5 className="observatory-col-txt">Lunar Phase</h5>
                            <h5 className="observatory-col-value">Waning Gibbous (64%)</h5>
                            <br/>                        
                        </div>
                    </div>
                    <br/>
                    <div className="observatory-col">
                        <div className="observatory-row">
                            <div className="flex-point3">
                                <h2 className="temp-value">49°F</h2>
                                <div className="pad5">
                                    <span className="values">75%</span>
                                </div>
                                <div className="pad5"> 
                                    <span className="values">10 MPH</span>
                                </div>
                                <div className="pad5">
                                    <span className="values">43°F</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="observatory-col-value pad5">Sky Rating</h4>
                                <h5 className="level">Level</h5>
                                <p className="reason">Noise gradient, blurriness or image
                                    attenuation expected for ~50% of 
                                    missions due to cloud, seeing,
                                    moonlight, or dust/haze.
                                </p>
                            </div>
                        </div>                        
                    </div> 
                    <br/>
                    <h2 className="observatory-heading2">Featured Missions</h2>
                    <div className="observatory-row">
                        {featuredMissionList.map( mission => (                            
                            <MissionCard
                                mission={mission}                 
                            />
                        ))}
                    </div>
                </div>                                   
            </div>   
        );
    }

}