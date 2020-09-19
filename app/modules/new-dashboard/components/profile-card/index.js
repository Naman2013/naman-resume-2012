import { Component } from 'react';
import React from "react";
import './style.scss';
import { ProgressCard } from '../progress-card';
import { Button } from '../button';

export class ProfileCard extends Component{

    
    render() {
        
        const { userGravityStatus } = this.props;
        const { memberName, currentTierName, avatarURL, gravityPoints, nextTierName, currentTierProgress, maxTierProgress, memberSince } = userGravityStatus;        
        const subHeading = "Current Level";               
        
        return (
            <div>
                {/* <Button
                    type={"button"}
                    onClickEvent={()=>{}} 
                    text={""}                                             
                    style={""}
                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"}
                />   */}
                <div className="profile-card-main">                    
                    <div className="profile-card-left">
                        <div className="imgContainer">
                            <img className="icon" src={avatarURL}/>
                        </div>
                    </div>
                    <div className="profile-card-right">
                        <h2 className="profile-card-heading">{memberName}</h2>               
                        <h4 className="profile-card-subHeading">{memberSince} </h4>
                        <span className="profile-card-value">{currentTierName}</span>
                        <h2 className="profile-gp">{gravityPoints} GP</h2>
                    </div>
                    
                </div>   
                <ProgressCard
                    currentProgress={currentTierProgress}
                    totalProgress={maxTierProgress}
                    nextLevelName={nextTierName}
                />
            </div>
        );
    }

}