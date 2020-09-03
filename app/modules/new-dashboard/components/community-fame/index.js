import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { GPCard } from "../gp-card";
import { LineChart } from '../../common/line-chart';

export class CommunityFame extends Component{

    
    render() {
        const {heading, gpPoints, communityFame} = this.props;
        const gplist = [{gpPoints: "0", text: "Hubble"},
                            {gpPoints: "4", text: "Swan"},
                            {gpPoints: "14", text: "Herchels"}];
        
        return (
            <div className="community-fame-main">

                <h2 className="community-fame-heading">{communityFame.sectionHeading }</h2> 

                    <GPCard
                        gravityEarnedToday={communityFame.gravityEarnedToday}
                    />                   

                    <div className="community-flex-layout">
                        {/* {communityFame.tierStats.map(gp=>(
                            <div className="community-gp-card">
                                <h2 className="community-gp-points">{gp.gravityPoints}</h2>
                                <h2 className="community-gp-txt">{gp.gravityMessage}</h2>
                            </div>
                        ))} */}
                    </div> 
                    <LineChart
                        data={communityFame.gravityGraph.dataPoints}
                        yLabel={communityFame.gravityGraph.yLabel}
                    />                                              
            </div>   
        );
    }

}