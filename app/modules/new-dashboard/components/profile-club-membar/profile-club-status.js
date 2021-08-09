import { Component } from 'react';
import React from "react";

import { getUserGravityStatus, getMembarInvitation } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ProfileClubCard } from '../profile-club-card';
import { BadgeList } from '../badge-list';


export class ProfileClubStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clubMembarInvitationData: undefined
        }
        this.getClubProfileInvitation();
    }

    timerId = null;

    getClubProfileInvitation = () => {
        const { at, cid, token } = getUserInfo();
        let data;
        if (this.props.publicProfile)
            data = {
                customerUUID: this.props.customerUUID,
                discussionGroupId:this.props.DiscussionGroupId,
                customerEmail:this.props.Emailaddress,
                at, cid, token 
            };
        getMembarInvitation({ ...data }).then(response => {
            const res = response.data;
            if (!res.apiError) {
                const { timestamp, expires } = res;
                const duration = (expires - timestamp) * 1000;

                if (this.timerId !== null)
                    clearTimeout(this.timerId);
                this.timerId = setTimeout(this.getUserProfileGravityAction, duration);
                this.setState({ clubMembarInvitationData: res });
                if (this.props.publicProfile)
                    this.props.onHide();
            } else {
                if (this.props.publicProfile)
                    this.props.onHide();
            }
        });
    }

    componentWillUnmount() {
        if (this.timerId !== null)
            clearTimeout(this.timerId);
    }

    render() {
        const { clubMembarInvitationData } = this.state;
        const { changeStatus, showRightButton, showLeftBuuton } = this.props;

        return (    
            <div>
                {clubMembarInvitationData && (
                    <div>
                         <ProfileClubCard
                            showRightButton={showRightButton}
                            showLeftBuuton={showLeftBuuton}
                            clubMembarInvitationData={clubMembarInvitationData}
                            changeStatus={changeStatus}
                            //userGravityStatus={userGravityStatus}
                        />
                        {/*   <BadgeList
                            publicProfile={true}
                            badgeLists={userGravityStatus.userBadgeList}
                            totalBadgeCount={userGravityStatus.totalBadgeCount}
                            currentBadgeCount={userGravityStatus.currentBadgeCount}
                        /> */}
                    </div>
                )}
            </div>
        );

    }

}