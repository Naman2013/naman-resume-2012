import { Component } from 'react';
import React from "react";
import './style.scss';
import { getUserGravityStatus } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ProfileCard } from './index';
import { BadgeList } from '../badge-list';

export class ProfileStatus extends Component{

    // constructor(props){
    //     super(props);
    //     this.state={
    //         userGravityStatus: undefined
    //     }
    //     this.getUserProfileGravityAction();
    // }

    // timerId=null;

    // getUserProfileGravityAction = () =>{
    //     const { at, cid, token } = getUserInfo();
    //     let data;
    //     if(this.props.publicProfile)
    //         data={customerUUID: this.props.customerUUID};
    //     else
    //         data={at, cid, token};
    //     getUserGravityStatus(data).then(response=>{
    //         const res=response.data;
    //         if(!res.apiError){
    //             const { timestamp, expires } = res;
    //             const duration=(expires-timestamp)*1000;
    //           
    //             if(this.timerId !== null)
    //                 clearTimeout(this.timerId);               
    //             this.timerId=setTimeout(this.getUserProfileGravityAction,duration );
    //             this.setState({userGravityStatus: res});
    //             if(this.props.publicProfile)
    //                 this.props.onHide();
    //         }
    //     });
    // }

    // componentWillUnmount(){
    //     if(this.timerId !== null)
    //         clearTimeout(this.timerId);
    // }
    
    render() {
        // const { userGravityStatus } = this.state;
        const { userGravityStatus, changeStatus, showRightButton, showLeftBuuton, scrollToRef, refreshPhotoHub } = this.props;

        return (
            <div>
                {userGravityStatus && (
                    <div>                
                        <ProfileCard
                            showRightButton={showRightButton}
                            showLeftBuuton={showLeftBuuton}
                            userGravityStatus={userGravityStatus}
                            changeStatus={changeStatus}
                        />
                        <BadgeList
                            badgeLists={userGravityStatus.userBadgeList}
                            totalBadgeCount={userGravityStatus.totalBadgeCount}
                            currentBadgeCount={userGravityStatus.currentBadgeCount}
                            scrollToRef={scrollToRef}
                            refreshPhotoHub={refreshPhotoHub}
                            callSource={"mvpBadge"}
                        />                                                           
                    </div>   
                )}
            </div>
        );

    }

}