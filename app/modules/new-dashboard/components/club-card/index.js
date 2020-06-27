import { Component } from 'react';
import React from "react";
import './style.scss';

export class ClubCard extends Component{

    
    render() {
        const { club } = this.props;

        return (
            <div className="club-card">                
                <h4 className="club-name">{club.name}</h4>                             
                <h4 className="club-type">{club.type}</h4>
                <h4 className="club-info">{club.info}</h4> 
            </div>
        );
    }

}