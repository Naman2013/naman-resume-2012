import { Component } from 'react';
import React from "react";
import './style.scss';
import { ProgressCard } from '../progress-card';
import { Button } from '../button';
import classnames from 'classnames';

export class ProfileClubCard extends Component {


    render() {

        const { clubMembarInvitationData, userGravityStatus, changeStatus, showRightButton, showLeftBuuton } = this.props;

        if (clubMembarInvitationData) {
            var { customerLinks } = clubMembarInvitationData.customerLinksData;
            var { totalMemberSentViewedCount, totalMemberSent, memberViewedCount } = customerLinks;
            var { firstname, lastname, gravityIconURL, gravityLabel, inviteeInvitationCode, inviteStatus } = customerLinks[0];
        }
        // const { customerLinks } = clubMembarInvitationData.customerLinksData;
        


        /*  const { memberName, currentTierName, avatarURL, gravityPoints, nextTierName, currentTierProgress, maxTierProgress, memberSince } = userGravityStatus;   */
        const subHeading = "Current Level";



        return (

            <div>
                {(showLeftBuuton || showRightButton) && (
                    <Button
                        type={"button"}
                        onClickEvent={changeStatus}
                        text={""}
                        style={classnames({ "left-arrow-btn": showLeftBuuton }, { "right-arrow-btn": showRightButton })}
                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"}
                    />
                )}

                <div className="profile-card-main">
                    {gravityIconURL &&
                        <div className="profile-card-left">
                            <div className="imgContainer">
                                <img className="icon" src={gravityIconURL} />
                            </div>
                        </div>
                    }

                    <div className="profile-card-right">
                        {firstname &&
                            <h2 className="profile-card-heading">{firstname}{lastname}</h2>
                        }

                        {inviteeInvitationCode &&
                            <h4 className="profile-card-subHeading">{inviteeInvitationCode} </h4>
                        }

                        {/* <span className="profile-card-value">{currentTierName}</span>
                            <h2 className="profile-gp">{gravityPoints} GP</h2> */}
                    </div>

                </div>

                <div style={{display:'flex',columnGap:'2%'}}>
                    <div style={{width:'100%'}} >
                        <ProgressCard
                            currentProgress={totalMemberSent}
                            totalProgress={totalMemberSentViewedCount}
                            nextLevelName='Sent'
                        />
                    </div>
                    <div style={{width:'100%'}}>
                        <ProgressCard
                            currentProgress={memberViewedCount}
                            totalProgress={totalMemberSentViewedCount}
                            nextLevelName='Viewed'
                        />
                    </div>
                </div>

            </div>
        );
    }

}