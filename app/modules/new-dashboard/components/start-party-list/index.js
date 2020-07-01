import { Component } from 'react';
import React from "react";
import './style.scss';
import { StartPartyCard } from '../start-parties-card';

export class StarPartyList extends Component{

    
    render() {
        const {heading, partylist} = this.props;
        
        return (
            <div className="party-list-main">
                <h2 className="party-list-heading">{heading}</h2>                        
                    <div className="party-list">
                        {partylist.map(party=>(
                            <StartPartyCard
                                party={party}
                            />
                        ))}                                                 
                    </div>
                                                               
            </div>   
        );
    }

}