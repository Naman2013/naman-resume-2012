import { Component } from 'react';
import React from "react";
import './style.css';
import { ProgressCard } from '../progress-card';


export class MissionCard extends Component{

    
    render() {
        const { mission } = this.props;

        return (
            <div className="mission-card">
                <h4 className="obj-name">{mission.objectname}</h4>
                <h4 className="time">{mission.time}</h4>
                <h4 className="scheduled-by"> 
                     by <u>{mission.scheduledby}</u> 
                     at <u>{mission.telescope}</u>
                </h4>
            </div>
        );
    }

}