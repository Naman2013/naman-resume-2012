import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from "../tab-header";
import { UpcomingMissionCard } from '../upcoming-mission-card';
import { ClubCard } from '../club-card';

export class ClubList extends Component{

    
    render() {
        const {heading, showExploreClubs, clubList} = this.props;
        
        return (
            <div className="club-list-main">
                <h2 className="club-list-heading">{heading}</h2>                        
                    <div className="club-list">
                        {clubList.map(club=>(
                            <ClubCard
                                club={club}
                            />
                        ))}
                        {showExploreClubs &&(
                            <div className="club-explore-card">
                                <div>
                                    <h4 className="club-title">Explore Other Clubs</h4>
                                </div>        
                                <p className="club-subtitle">Find Some awesome communities to share progress and receive experience</p>
                        </div>
                        )}                            
                    </div>
                                                               
            </div>   
        );
    }

}