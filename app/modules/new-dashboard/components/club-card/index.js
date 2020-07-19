import { Component } from 'react';
import React from "react";
import './style.scss';

export class ClubCard extends Component{

    
    render() {
        const { club } = this.props;
        
        return (
            <div className="club-card">                
                <h4 className="club-name">{club.title}</h4>    
                <div className="card-bottom">
                    <h4 className="club-type">{club.accessDescription}</h4>
                    <h4 className="club-info">{"Admin: Paul Cox | " + club.memberCountDisplay}</h4> 
                </div>                
            </div>
        );
    }

}