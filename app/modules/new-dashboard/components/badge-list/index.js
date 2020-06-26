import { Component } from 'react';
import React from "react";
import './style.css';


export class BadgeList extends Component{

    
    render() {
        const heading = "Badges(1/50)";
        const badgelist = ["https://vega.slooh.com/assets/v4/dashboard-new/maze_icon.svg",
                            "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

        return (
            <div className="badge-main">
                <h2 className="badge-heading">{heading}</h2>
                <div className="badgelist">
                    {badgelist.map(badge=>(
                        <div className={badge ? "badge-present" : "badge-empty"}>
                            {badge && (
                                <img src={badge} className="badge-icon"/>
                            )}
                        </div>
                        
                    ))}
                </div>                              
            </div>   
        );
    }

}