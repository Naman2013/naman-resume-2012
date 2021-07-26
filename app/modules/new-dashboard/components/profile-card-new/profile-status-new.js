import { Component } from 'react';
import React from "react";

import { getUserGravityStatus } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ProfileCard } from '../profile-card';
import { BadgeList } from '../badge-list';

export class ProfileStatusNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userGravityStatus: undefined
        }
        this.getUserProfileGravityAction();
    }

    timerId = null;

    getUserProfileGravityAction = () => {
        const { at, cid, token } = getUserInfo();
        let data;
        if (this.props.publicProfile)
            data = { customerUUID: this.props.customerUUID };
        else
            data = { at, cid, token };
        getUserGravityStatus({ ...data }).then(response => {
            const res = response.data;
            if (!res.apiError) {
                const { timestamp, expires } = res;
                const duration = (expires - timestamp) * 1000;

                if (this.timerId !== null)
                    clearTimeout(this.timerId);
                this.timerId = setTimeout(this.getUserProfileGravityAction, duration);
                this.setState({ userGravityStatus: res });
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
        const { userGravityStatus } = this.state;
        const { changeStatus, showRightButton, showLeftBuuton } = this.props;

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
                            publicProfile={true}
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