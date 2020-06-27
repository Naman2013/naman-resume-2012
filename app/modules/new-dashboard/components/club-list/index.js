import { Component } from 'react';
import React from "react";
import './style.scss';
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
                                <div className="club-explore-card-head">
                                    <h4 className="club-title">Explore Other Clubs</h4>
                                    <img className="club-card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                </div>        
                                <p className="club-subtitle">Find Some awesome communities to share progress and receive experience</p>
                        </div>
                        )}                            
                    </div>
                                                               
            </div>   
        );
    }

}