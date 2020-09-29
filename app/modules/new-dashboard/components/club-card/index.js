import { Component } from 'react';
import React from "react";
import './style.scss';
import { Link } from 'react-router';

export class ClubCard extends Component{

    
    render() {
        const { club } = this.props;
        
        return (
            <div className="club-card">
                <Link
                    to={club.linkUrl}>
                    <h4 className="club-name">{club.title}</h4>                    
                </Link>                
                
                <div className="card-bottom">
                    <h4 className="club-type">{club.accessDescription}</h4>
                    <h4 className="club-info">{club.descriptiveText}</h4> 
                </div>                
            </div>
        );
    }

}