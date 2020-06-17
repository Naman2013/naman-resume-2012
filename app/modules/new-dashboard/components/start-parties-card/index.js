import { Component } from 'react';
import React from "react";
import './style.css';



export class StartPartyCard extends Component{

    
    render() {
        const { party } = this.props;

        return (
            <div className="star-party-card">
                <span className="counter-text">{party.startText}</span>
                <h2 className="party-name">{party.name}</h2>
                <h5 className="party-date-time">{party.dateTime}</h5>                                    
                <span className="astronomer-text">
                    <img className="astronomer-img" src={party.astronomerImageURL}/>
                    {party.astronomerName}
                </span>                
            </div>
        );
    }

}