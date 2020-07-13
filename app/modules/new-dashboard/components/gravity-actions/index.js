import { Component } from 'react';
import React from "react";
import './style.scss';


export class GravityActions extends Component{

    
    render() {
        const heading = "Recent Gravity Actions";
        const gravityList = [{gravityPoints: "+44", text: "Top Object is Eagle Nebula Top Object is Eagle Nebula"},
                            {gravityPoints: "+24", text: "Top Object is Eagle Nebula"},
                            {gravityPoints: "+24", text: "Top Object is Venus"},
                            {gravityPoints: "+1", text: "Top Observation is Venus"}];

        return (
            <div className="gravity-main">
                <h2 className="gravity-heading">{heading}</h2>                
                    {gravityList.map(gravity=>(
                        <div className="gravityaction">
                            <div className="gravityiconContainer">
                                <span className="gravitypoints">{gravity.gravityPoints}</span>
                            </div>
                            <span className="gravitytext">{gravity.text}</span>
                        </div>
                    ))}                                            
            </div>   
        );
    }

}