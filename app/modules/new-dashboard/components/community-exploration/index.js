import { Component } from 'react';
import React from "react";
import './style.css';
import { ImageSlider } from '../image-slider';
import { getCommunityExploration } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';


export class CommunityExploration extends Component{

    constructor(props){
        super(props);
        this.state={
            communityExploration: undefined
        }
        this.getCommunityObservationAction();
    }

    getCommunityObservationAction = () =>{
        const { at, cid, token } = getUserInfo();
        getCommunityExploration({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("Community Exploration Duration"+duration);                
                setTimeout(this.getCommunityObservationAction,duration );
                this.setState({communityExploration: res});
            }
        });
    }

    render() {
        const { communityExploration } = this.state;
        
        return (
            <div className="explore-main">
                {/* <h2 className="explore-heading">{heading}</h2> */}
                {communityExploration && (
                    <ImageSlider
                        communityExploration={communityExploration}
                    />
                )}                                
            </div>   
        );
    }

}