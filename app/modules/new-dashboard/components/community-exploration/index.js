import { Component } from 'react';
import React from "react";
import './style.css';
import { ImageSlider } from '../image-slider';
import { getCommunityExploration } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { RecentCommunityActivities } from '../recent-community-activities';


export class CommunityExploration extends Component{

    constructor(props){
        super(props);
        this.state={
            communityExploration: undefined
        }
        this.getCommunityObservationAction();
    }

    timerId=null;

    getCommunityObservationAction = () =>{
        const { at, cid, token } = getUserInfo();
        getCommunityExploration({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("Community Exploration Duration"+duration);
                if(this.timerId !== null)
                    clearTimeout(this.timerId);                
                this.timerId=setTimeout(this.getCommunityObservationAction,duration );
                this.setState({communityExploration: res});
            }
        });
    }

    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }

    render() {
        const { communityExploration } = this.state;
        const { onClickItem } = this.props;
        
        return (
            <div className="explore-main">
                {/* <h2 className="explore-heading">{heading}</h2> */}
                {communityExploration && (
                    <div>
                        <ImageSlider
                            communityExploration={communityExploration}
                            onClickItem={onClickItem}
                        />
                        <RecentCommunityActivities
                            heading={"Recent Community Activities"}
                            activities={communityExploration.activities}
                            onClickItem={onClickItem}
                        />
                    </div>
                )}                                
            </div>   
        );
    }

}