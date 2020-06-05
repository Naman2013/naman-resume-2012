import { Component } from 'react';
import React from "react";
import './style.css';
import { ProgressCard } from '../progress-card';


export class ProfileCard extends Component{

    
    render() {
        const heading = "Colleen Henry";
        const subHeading = "Current Level";
        const subHeadingValue= "Ptolemy";
        const imgURL="https://vega.slooh.com/assets/v4/icons/avatars/Azophi_Profile.svg";

        return (
            <div>
                <div className="profile-card-main">
                    <div className="profile-card-left">
                        <div className="imgContainer">
                            <img className="icon" src={imgURL}/>
                        </div>
                    </div>
                    <div className="profile-card-right">
                        <h2 className="profile-card-heading">{heading}</h2>               
                        <h4 className="profile-card-subHeading">{subHeading}: <span className="value">{subHeadingValue}</span></h4>
                    </div>
                    
                </div>   
                <ProgressCard/>
            </div>
        );
    }

}