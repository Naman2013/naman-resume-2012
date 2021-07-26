import { Component } from 'react';
import React from "react";
import './style.scss';
import { Button } from '../button';
import { ProfileStatus } from '../profile-card/profile-status';
import { PopularObservation } from '../object-list/popular-observation';
import { Spinner } from 'app/components/spinner/index';
import { ProfileStatusNew } from '../profile-card-new/profile-status-new';

export class PublicProfileCard extends Component{

    state={
        loading: true
    }
    setSpinner =()=>{
        this.setState({loading: false})
    }

    render() {
        const { onClose, customerUUID } = this.props;
        const { loading } = this.state;
        
        return (
            <div className="new-dash">
                <Spinner loading={loading} />
                <div className="profilecard-header">
                    <h2 className="title-heading">{"Public Profile"}</h2> 
                    <Button
                        type={"button"}
                        onClickEvent={onClose} 
                        text={"Close"}                                             
                        style={"public-card-close-button"}
                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/close_slooh_blue.svg"}
                    />
                </div>
                <div>
                    <ProfileStatusNew 
                        showRightButton={false}
                        showLeftBuuton={false}
                        changeStatus={null}
                        customerUUID={customerUUID}
                        publicProfile={true}
                        onHide={()=>this.setSpinner()}
                    />
                    <PopularObservation 
                        customerUUID={customerUUID}
                        publicProfile={true}
                        onHide={()=>this.setSpinner()}
                    />
                </div>
            </div>   
        );
    }

}