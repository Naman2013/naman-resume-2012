import { Component } from 'react';
import React from "react";
import './style.scss';
import { getUserGravityStatus } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ProfileCard } from './index';
import { BadgeList } from '../badge-list';

export class ProfileStatus extends Component{

    constructor(props){
        super(props);
        this.state={
            userGravityStatus: undefined
        }
        this.getUserProfileGravityAction();
    }

    timerId=null;

    getUserProfileGravityAction = () =>{
        const { at, cid, token } = getUserInfo();
        getUserGravityStatus({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("User Gravity Status Duration"+duration); 
                if(this.timerId !== null)
                    clearTimeout(this.timerId);               
                this.timerId=setTimeout(this.getUserProfileGravityAction,duration );
                this.setState({userGravityStatus: res});
            }
        });
    }

    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }
    
    render() {
        const { userGravityStatus } = this.state;
        
        return (
            <div>
                {userGravityStatus && (
                    <div>                
                        <ProfileCard
                            userGravityStatus={userGravityStatus}
                        />
                        <BadgeList
                            badgeLists={userGravityStatus.userBadgeList}
                            totalBadgeCount={userGravityStatus.totalBadgeCount}
                            currentBadgeCount={userGravityStatus.currentBadgeCount}
                        />                                                           
                    </div>   
                )}
            </div>
        );

    }

}