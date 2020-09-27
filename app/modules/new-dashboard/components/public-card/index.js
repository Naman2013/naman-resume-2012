import { Component } from 'react';
import React from "react";
import './style.scss';
import { Button } from '../button';
import { ProfileStatus } from '../profile-card/profile-status';
import { PopularObservation } from '../object-list/popular-observation';


export class PublicProfileCard extends Component{

    
    render() {
        const { onClose, customerUUID } = this.props;
        
        return (
            <div className="new-dash">
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
                    <ProfileStatus 
                        customerUUID={customerUUID}
                        publicProfile={true}
                    />
                    <PopularObservation 
                        customerUUID={customerUUID}
                        publicProfile={true}
                    />
                </div>
            </div>   
        );
    }

}