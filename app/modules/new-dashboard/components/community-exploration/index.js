import { Component, PureComponent } from 'react';
import React from "react";
import './style.css';
import { ImageSlider } from '../image-slider';
import { getCommunityExploration } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { RecentCommunityActivities } from '../recent-community-activities';
import { SectionDivider } from '../section-divider';

export class CommunityExploration extends PureComponent{

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
            else
                this.props.validateResponseAccess(res);
        });
    }

    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }

    startTimer=()=>{
        this.getCommunityObservationAction();
    }

    stopTimer=()=>{
        if(this.timerId !== null)
            clearTimeout(this.timerId);    
    }

    render() {
        const { communityExploration } = this.state;
        const { onClickItem, scrollToRef, validateResponseAccess } = this.props;
       
        return (
            <div className="explore-main">  
                <h2 className="photo-hub-heading">{"Community"}</h2>                
                {communityExploration && (
                    <div>
                        {/* <br/> */}
                        {communityExploration.featuredObservations.sectionHeading && (
                            <h2 className="recent-heading">{communityExploration.featuredObservations.sectionHeading}</h2>
                        )}
                        {communityExploration.featuredObservations.sectionSubHeading && (
                            <h4 className="title-subHeading">{communityExploration.featuredObservations.sectionSubHeading}</h4>
                        )}
                        <ImageSlider
                            communityExploration={communityExploration}
                            onClickItem={onClickItem}
                            scrollToRef={scrollToRef}
                            startTimer={this.startTimer}
                            stopTimer={this.stopTimer}
                            validateResponseAccess={validateResponseAccess}
                        />
                        <SectionDivider />
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