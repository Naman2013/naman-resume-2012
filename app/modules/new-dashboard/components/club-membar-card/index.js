import { Component } from 'react';
import React from "react";
import './style.scss';
import { Button } from '../button';
import { ProfileStatus } from '../profile-card/profile-status';
import { PopularObservation } from '../object-list/popular-observation';
import { Spinner } from 'app/components/spinner/index';
import { ProfileClubStatus } from '../profile-club-membar/profile-club-status';

export class ClubProfileCard extends Component{

    state={
        loading: true
    }
    setSpinner =()=>{
        this.setState({loading: false})
    }

    render() {
        const { onClose, customerUUID,Emailaddress,DiscussionGroupId } = this.props;
        const { loading } = this.state;
        
        return (
            <div className="new-dash">
                 <Spinner loading={loading} />
                <div className="profilecard-header">
                    <h2 className="club-title-heading">{"Club Member Invitation"}</h2> 
                    <Button
                        type={"button"}
                        onClickEvent={onClose}
                        text={"Close"}                                             
                        style={"club-member-card-close-button"}
                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/close_slooh_blue.svg"}
                    />
                </div>
                <div style={{width:'100%'}}>
                    <ProfileClubStatus 
                        showRightButton={false}
                        showLeftBuuton={false}
                        changeStatus={null}
                        customerUUID={customerUUID}
                        DiscussionGroupId={DiscussionGroupId}
                        Emailaddress={Emailaddress}
                        publicProfile={true}
                        onHide={()=>this.setSpinner()}
                    />
                   {/*  <PopularObservation 
                        customerUUID={customerUUID}
                        publicProfile={true}
                        onHide={()=>this.setSpinner()}
                    /> */}
                </div>
            </div>   
        );
    }

}