import { Component } from 'react';
import React from "react";
import './style.scss';
import Countdown from 'react-countdown-now';
import { twoDigitsTimeFormatting } from 'app/utils/time-formatting';
import moment from 'moment';
import { Link } from 'react-router';

export class StarPartyCard extends Component{

    state={
        live: false
    }
    
    render() {
        const { party } = this.props;
        const now= moment(Date.now()).unix();        
        const countdown = party.eventStart-now;        
        
        return (
            <div className="star-party-card">
                {countdown > 0 ? 
                    <Countdown
                        date={party.eventStart*1000}
                        onComplete={null}                   
                        renderer={props => (                        
                            <span className="counter-text">
                                {props.days < 1 ? 
                                    "Starts in " + twoDigitsTimeFormatting(props.hours) + ":" + twoDigitsTimeFormatting(props.minutes) + ":" + twoDigitsTimeFormatting(props.seconds) :
                                    "Upcoming StarParty!"
                                }
                                
                            </span>                        
                        )}
                    />
                :
                <span className="counter-text live">LIVE</span>
                }               
                <Link
                    to={party.linkUrl}>
                    <h2 className="party-name" >{party.eventTitle}</h2>
                </Link>
                <div className="card-bottom">
                    <h5 className="party-date-time">{party.displayDate}</h5>                                    
                    <span className="astronomer-text">
                        <img className="astronomer-img" src={"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png"}/>
                        {party.eventHostName}
                    </span>
                </div>
                                
            </div>
        );
    }

}