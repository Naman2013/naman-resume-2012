import { Component } from 'react';
import React from "react";
import './style.css';
import { ProgressCard } from '../progress-card';


export class UpcomingMissionCard extends Component{

    
    render() {
        const { party } = this.props;

        return (
            <div className="star-party-card">
                <span className="counter-text">{party.startText}</span>
                <h2 className="party-name">{party.name}</h2>
                <h5 className="party-date-time">{party.dateTime}</h5>
                <div className="astronomers">
                    <img className="astronomer-img" src={party.astronomerImageURL}/>
                    <span className="astronomer-text">{party.astronomerName}</span>
                </div>                
            </div>
        );
    }

}