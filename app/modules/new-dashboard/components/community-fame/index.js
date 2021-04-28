import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { GPCard } from "../gp-card";
import { LineChart } from '../../common/line-chart';
import { getCommunityFame } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { TitleHeader } from '../title-header';

export class CommunityFame extends Component{

    constructor(props){
        super(props);
        this.state={
            communityFame: undefined
        }
        this.getCommunityStatsAction();
    }

    timerId=null;

    getCommunityStatsAction = () =>{
        const { at, cid, token } = getUserInfo();
        getCommunityFame({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
    
                this.setState({communityFame: res});
                if(this.timerId !== null)              
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(this.getCommunityStatsAction,duration );
                
            }
            else
                this.props.validateResponseAccess(res)
        });
    }

    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }
    
    render() {
        const { communityFame } = this.state;        
        
        return (
            <div>
                {communityFame && (
                    <div className="community-fame-main">
                        <h2 className="title-heading center-align">Sloohvian Hall of Fame</h2>
                        <h2 className="community-fame-heading">{communityFame.sectionHeading }</h2> 

                            <GPCard
                                gravityEarnedToday={communityFame.gravityEarnedToday}
                                data={communityFame.gravityGraph.dataPoints}
                                yLabel={communityFame.gravityGraph.yLabel}
                                sectionHeading={communityFame.gravityGraph.sectionHeading}
                            />                   
                            <h2 className="community-fame-heading">{communityFame.tierStatsHeading}</h2> 
                            <div className="community-flex-layout">
                                {communityFame.tierStats.map(gp=>(
                                    <div className="community-gp-card">
                                        <h2 className="community-gp-points">{gp.count}</h2>
                                        <h2 className="community-gp-txt">{gp.label}</h2>
                                    </div>
                                ))}
                            </div> 
                            {/* <LineChart
                                data={communityFame.gravityGraph.dataPoints}
                                yLabel={communityFame.gravityGraph.yLabel}
                            />                                               */}
                    </div>
                )}
            </div>  
        );
    }

}