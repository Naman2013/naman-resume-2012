import { Component } from 'react';
import React from "react";
import './style.scss';
import { MissionCard } from '../mission-card';

export class FeaturedMissionList extends Component{

    
    render() {
        // const featuredMissionList = [{objectname: "LMT Cluster Bennett 36 (NGC 2214)" , time: "10:30 UTC", scheduledby: "Regina Murphy", telescope: "Chile One"},
        // {objectname: "LMT Cluster Bennett 36 (NGC 2214)" , time: "10:30 UTC", scheduledby: "Regina Murphy", telescope: "Chile One"}];

        const { featuredMissionList, showExplanation, explanation, readOnly, reservationModalShow, heading, subHeading  } = this.props;
       
        return (
            <div className="featured-main">
                {heading && (
                    <div>                       
                        {heading && (
                            <h3 className="upcoming-subheadings">{heading}</h3>
                        )}
                        {subHeading && (                        
                            <h5 className="upcoming-subheading-status">{subHeading}</h5>
                        )}  
                    </div> 
                )}
                {/* <h2 className="featured-heading">Featured Missions</h2> */}
                    <div className="featured-row">
                        {featuredMissionList.map( mission => (                            
                            <MissionCard
                                mission={mission}  
                                readOnly={readOnly}   
                                reservationModalShow ={reservationModalShow }            
                            />
                        ))}
                    </div>  
                    {showExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{explanation}</h3>
                      </div>                        
                    )}                                   
            </div>   
        );
    }

}